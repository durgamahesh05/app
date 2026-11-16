"""Expense recording and listing endpoints."""

from datetime import datetime, timezone
from typing import Any
from uuid import uuid4

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from pymongo import DESCENDING

from database import get_database
from main import CurrentUser

router = APIRouter(prefix="/api/expenses", tags=["expenses"])


class ExpenseInput(BaseModel):
    description: str = Field(min_length=1, max_length=200)
    amount: float = Field(gt=0, le=100000000)
    category: str | None = Field(default=None, max_length=64)
    group_id: str | None = Field(default=None, alias="groupId")
    participants: list[str] = Field(default_factory=list)


class ExpenseRemoval(BaseModel):
    id: str


class ExpenseSplitInput(BaseModel):
    id: str
    participants: list[str] = Field(min_length=1)


def _public(expense: dict[str, Any]) -> dict[str, Any]:
    created_at = expense["created_at"]
    if created_at.tzinfo is None:
        created_at = created_at.replace(tzinfo=timezone.utc)
    return {"id": expense["id"], "description": expense["description"],
            "amount": expense["amount"], "paidBy": expense["paid_by"],
            "groupId": expense.get("group_id"), "category": expense.get("category", "Other"),
            "splits": expense["splits"],
            "createdAt": created_at.isoformat()}


@router.post("/create", status_code=201)
def create_expense(request: ExpenseInput, user: CurrentUser):
    description = request.description.strip()
    if not description:
        raise HTTPException(422, "Description cannot be empty")
    client, db = get_database()
    try:
        members = [user["id"]]
        if request.group_id:
            group = db["groups"].find_one({"id": request.group_id, "members": user["id"]})
            if not group:
                raise HTTPException(404, "Group not found")
            members = group["members"]
        participants = list(dict.fromkeys(request.participants or members))
        if not participants or any(person not in members for person in participants):
            raise HTTPException(422, "Expense participants must be members of the group")
        share = round(request.amount / len(participants), 2)
        splits = [{"userId": person, "amount": share} for person in participants]
        # Assign any rounding remainder to the last participant so shares equal the total.
        splits[-1]["amount"] = round(request.amount - sum(s["amount"] for s in splits[:-1]), 2)
        expense = {"id": str(uuid4()), "description": description, "amount": round(request.amount, 2),
                   "paid_by": user["id"], "group_id": request.group_id,
                   "category": request.category.strip().title() if request.category and request.category.strip() else "Other",
                   "participants": participants, "splits": splits,
                   "created_at": datetime.now(timezone.utc)}
        db["expenses"].insert_one(expense)
        return _public(expense)
    finally:
        client.close()


@router.get("/list")
def list_expenses(user: CurrentUser):
    client, db = get_database()
    try:
        group_ids = [g["id"] for g in db["groups"].find({"members": user["id"]}, {"id": 1})]
        query = {"$or": [{"paid_by": user["id"]}, {"participants": user["id"]},
                         {"group_id": {"$in": group_ids}}]}
        return [_public(e) for e in db["expenses"].find(query).sort("created_at", DESCENDING)]
    finally:
        client.close()


@router.delete("/delete")
def delete_expense(request: ExpenseRemoval, user: CurrentUser):
    client, db = get_database()
    try:
        result = db["expenses"].delete_one({"id": request.id, "paid_by": user["id"]})
        if not result.deleted_count:
            raise HTTPException(404, "Expense not found or you are not its owner")
        return {"deleted": True, "id": request.id}
    finally:
        client.close()


@router.post("/split")
def update_split(request: ExpenseSplitInput, user: CurrentUser):
    client, db = get_database()
    try:
        expense = db["expenses"].find_one({"id": request.id, "paid_by": user["id"]})
        if not expense:
            raise HTTPException(404, "Expense not found or you are not its owner")
        if expense.get("group_id"):
            group = db["groups"].find_one({"id": expense["group_id"], "members": user["id"]})
            members = group["members"] if group else []
        else:
            members = [user["id"]]
        participants = list(dict.fromkeys(request.participants))
        if not participants or any(person not in members for person in participants):
            raise HTTPException(422, "Split participants must be members of the expense group")
        share = round(float(expense["amount"]) / len(participants), 2)
        splits = [{"userId": person, "amount": share} for person in participants]
        splits[-1]["amount"] = round(float(expense["amount"]) - sum(item["amount"] for item in splits[:-1]), 2)
        db["expenses"].update_one({"id": expense["id"]}, {"$set": {"participants": participants, "splits": splits}})
        expense["participants"] = participants
        expense["splits"] = splits
        return _public(expense)
    finally:
        client.close()
