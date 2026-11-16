"""Settlement records and authenticated activity history."""

from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from database import get_database
from main import CurrentUser

router = APIRouter(prefix="/api/settlements", tags=["settlements"])


def _iso(value: datetime) -> str:
    return (value.replace(tzinfo=timezone.utc) if value.tzinfo is None else value).isoformat()


class SettlementInput(BaseModel):
    group_id: str = Field(alias="groupId")
    to_user_id: str = Field(alias="toUserId")
    amount: float = Field(gt=0, le=100000000)


@router.post("/create", status_code=201)
def create_settlement(request: SettlementInput, user: CurrentUser):
    client, db = get_database()
    try:
        group = db["groups"].find_one({"id": request.group_id, "members": user["id"]})
        if not group or request.to_user_id not in group["members"] or request.to_user_id == user["id"]:
            raise HTTPException(404, "Settlement participant not found in this group")
        item = {"id": str(uuid4()), "group_id": request.group_id, "from_user_id": user["id"],
                "to_user_id": request.to_user_id, "amount": round(request.amount, 2),
                "created_at": datetime.now(timezone.utc)}
        db["settlements"].insert_one(item)
        return {"id": item["id"], "groupId": item["group_id"], "fromUserId": item["from_user_id"],
                "toUserId": item["to_user_id"], "amount": item["amount"],
                "createdAt": item["created_at"].isoformat()}
    finally:
        client.close()


@router.get("/history")
def settlement_history(user: CurrentUser):
    client, db = get_database()
    try:
        events = []
        for expense in db["expenses"].find({"$or": [{"paid_by": user["id"]},
                                                       {"participants": user["id"]}]}):
            events.append({"id": expense["id"], "kind": "paid" if expense["paid_by"] == user["id"] else "owed",
                           "text": f"{expense['description']} expense recorded", "amount": expense["amount"],
                           "direction": "out" if expense["paid_by"] == user["id"] else "get",
                           "time": _iso(expense["created_at"])})
        for item in db["settlements"].find({"$or": [{"from_user_id": user["id"]}, {"to_user_id": user["id"]}]}):
            events.append({"id": item["id"], "kind": "paid" if item["from_user_id"] == user["id"] else "received",
                           "text": "Settlement recorded", "amount": item["amount"],
                           "direction": "out" if item["from_user_id"] == user["id"] else "in",
                           "time": _iso(item["created_at"])})
        return sorted(events, key=lambda event: event["time"], reverse=True)
    finally:
        client.close()
