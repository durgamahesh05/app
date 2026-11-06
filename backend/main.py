"""Merizo authentication API."""

import base64
import hashlib
import hmac
import json
import os
import re
from datetime import datetime, timedelta, timezone
from typing import Annotated, Any
from uuid import uuid4

import bcrypt
from fastapi import Depends, FastAPI, Header, HTTPException, status
from pydantic import BaseModel, Field
from pymongo.errors import DuplicateKeyError

from database import get_database


app = FastAPI(title="Merizo API")
TOKEN_LIFETIME = timedelta(days=7)
EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


class Credentials(BaseModel):
    email: str = Field(min_length=3, max_length=254)
    password: str = Field(min_length=8, max_length=128)


class Registration(Credentials):
    name: str = Field(min_length=1, max_length=100)


class ProfileUpdate(BaseModel):
    name: str = Field(min_length=1, max_length=100)


def _public_user(user: dict[str, Any]) -> dict[str, Any]:
    return {"id": user["id"], "name": user["name"], "email": user["email"]}


def _email(value: str) -> str:
    email = value.strip().lower()
    if not EMAIL_PATTERN.fullmatch(email):
        raise HTTPException(status_code=422, detail="Enter a valid email address")
    return email


def _secret() -> bytes:
    secret = os.getenv("JWT_SECRET", "")
    if len(secret.encode("utf-8")) < 32:
        raise HTTPException(
            status_code=500,
            detail="Backend configuration is missing a JWT_SECRET of at least 32 characters",
        )
    return secret.encode("utf-8")


def _encode_token(user: dict[str, Any]) -> str:
    payload = {
        "sub": user["id"],
        "exp": int((datetime.now(timezone.utc) + TOKEN_LIFETIME).timestamp()),
    }
    encoded = base64.urlsafe_b64encode(json.dumps(payload).encode()).rstrip(b"=")
    signature = hmac.new(_secret(), encoded, hashlib.sha256).digest()
    signed = base64.urlsafe_b64encode(signature).rstrip(b"=")
    return f"{encoded.decode()}.{signed.decode()}"


def _current_user(authorization: Annotated[str | None, Header()] = None) -> dict[str, Any]:
    scheme, _, token = (authorization or "").partition(" ")
    if scheme.lower() != "bearer" or not token or "." not in token:
        raise HTTPException(status_code=401, detail="Authentication required")

    encoded, supplied_signature = token.split(".", 1)
    expected = base64.urlsafe_b64encode(
        hmac.new(_secret(), encoded.encode(), hashlib.sha256).digest()
    ).rstrip(b"=").decode()
    if not hmac.compare_digest(supplied_signature, expected):
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    try:
        padded = encoded + "=" * (-len(encoded) % 4)
        payload = json.loads(base64.urlsafe_b64decode(padded))
        if int(payload["exp"]) <= int(datetime.now(timezone.utc).timestamp()):
            raise ValueError("expired")
        user_id = payload["sub"]
    except (ValueError, KeyError, TypeError, json.JSONDecodeError):
        raise HTTPException(status_code=401, detail="Invalid or expired token") from None

    client, database = get_database()
    try:
        user = database["users"].find_one({"id": user_id})
        if not user:
            raise HTTPException(status_code=401, detail="User no longer exists")
        return user
    finally:
        client.close()


CurrentUser = Annotated[dict[str, Any], Depends(_current_user)]


@app.post("/api/auth/register", status_code=status.HTTP_201_CREATED)
def register(request: Registration) -> dict[str, Any]:
    email = _email(request.email)
    name = request.name.strip()
    if not name:
        raise HTTPException(status_code=422, detail="Name cannot be empty")
    password_bytes = request.password.encode("utf-8")
    if len(password_bytes) > 72:
        raise HTTPException(status_code=422, detail="Password must be 72 bytes or fewer")

    now = datetime.now(timezone.utc)
    user = {
        "id": str(uuid4()),
        "name": name,
        "email": email,
        "password_hash": bcrypt.hashpw(password_bytes, bcrypt.gensalt(rounds=12)).decode(),
        "created_at": now,
        "updated_at": now,
    }
    client, database = get_database()
    try:
        database["users"].insert_one(user)
    except DuplicateKeyError:
        raise HTTPException(status_code=409, detail="An account with this email already exists") from None
    finally:
        client.close()
    return {"user": _public_user(user)}


@app.post("/api/auth/login")
def login(request: Credentials) -> dict[str, Any]:
    email = _email(request.email)
    client, database = get_database()
    try:
        user = database["users"].find_one({"email": email})
    finally:
        client.close()

    password_hash = user.get("password_hash") if user else None
    valid = False
    if isinstance(password_hash, str):
        try:
            valid = bcrypt.checkpw(request.password.encode("utf-8"), password_hash.encode("utf-8"))
        except ValueError:
            valid = False
    if not valid:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"token": _encode_token(user), "user": _public_user(user)}


@app.get("/api/users/profile")
def profile(user: CurrentUser) -> dict[str, Any]:
    return _public_user(user)


@app.post("/api/users/update")
def update_profile(request: ProfileUpdate, user: CurrentUser) -> dict[str, Any]:
    name = request.name.strip()
    if not name:
        raise HTTPException(status_code=422, detail="Name cannot be empty")
    client, database = get_database()
    try:
        database["users"].update_one(
            {"id": user["id"]},
            {"$set": {"name": name, "updated_at": datetime.now(timezone.utc)}},
        )
    finally:
        client.close()
    return {"id": user["id"], "name": name, "email": user["email"]}
