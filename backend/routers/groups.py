"""Group membership endpoints."""

from datetime import datetime, timezone
from secrets import token_urlsafe
from typing import Any
from uuid import uuid4

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from database import get_database
from main import CurrentUser

router = APIRouter(prefix="/api/groups", tags=["groups"])


class CreateGroup(BaseModel):
    name: str = Field(min_length=1, max_length=100)


class JoinGroup(BaseModel):
    code: str = Field(min_length=4, max_length=64)


def _public(group: dict[str, Any]) -> dict[str, Any]:
    return {"id": group["id"], "name": group["name"], "members": group["members"],
            "settled": group.get("settled", False), "inviteCode": group["invite_code"]}


@router.post("/create", status_code=201)
def create_group(request: CreateGroup, user: CurrentUser):
    name = request.name.strip()
    if not name:
        raise HTTPException(422, "Group name cannot be empty")
    group = {"id": str(uuid4()), "name": name, "owner_id": user["id"],
             "members": [user["id"]], "invite_code": token_urlsafe(8),
             "settled": False, "created_at": datetime.now(timezone.utc)}
    client, db = get_database()
    try:
        db["groups"].insert_one(group)
    finally:
        client.close()
    return _public(group)


@router.get("/list")
def list_groups(user: CurrentUser):
    client, db = get_database()
    try:
        return [_public(g) for g in db["groups"].find({"members": user["id"]})]
    finally:
        client.close()


@router.post("/join")
def join_group(request: JoinGroup, user: CurrentUser):
    client, db = get_database()
    try:
        group = db["groups"].find_one({"invite_code": request.code.strip()})
        if not group:
            raise HTTPException(404, "Invite code was not found")
        db["groups"].update_one({"id": group["id"]}, {"$addToSet": {"members": user["id"]}})
        group["members"] = list(set(group["members"] + [user["id"]]))
        return _public(group)
    finally:
        client.close()


@router.get("/members")
def group_members(group_id: str, user: CurrentUser):
    client, db = get_database()
    try:
        group = db["groups"].find_one({"id": group_id, "members": user["id"]})
        if not group:
            raise HTTPException(404, "Group not found")
        return [{"id": member["id"], "name": member["name"], "email": member["email"]}
                for member in db["users"].find({"id": {"$in": group["members"]}})]
    finally:
        client.close()
