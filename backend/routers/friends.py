"""Friends visible through shared groups and their net balance."""

from fastapi import APIRouter

from database import get_database
from main import CurrentUser

router = APIRouter(prefix="/api/friends", tags=["friends"])


@router.get("/list")
def list_friends(user: CurrentUser):
    client, db = get_database()
    try:
        groups = list(db["groups"].find({"members": user["id"]}))
        group_ids = [group["id"] for group in groups]
        peer_ids = {member for group in groups for member in group["members"] if member != user["id"]}
        peers = {peer["id"]: {"id": peer["id"], "name": peer["name"], "balance": 0.0}
                 for peer in db["users"].find({"id": {"$in": list(peer_ids)}})}
        for expense in db["expenses"].find({"group_id": {"$in": group_ids}}):
            shares = {split["userId"]: float(split["amount"]) for split in expense.get("splits", [])}
            payer = expense["paid_by"]
            if payer == user["id"]:
                for peer_id in peers:
                    if peer_id in shares:
                        peers[peer_id]["balance"] += shares[peer_id]
            elif payer in peers and user["id"] in shares:
                peers[payer]["balance"] -= shares[user["id"]]
        for item in db["settlements"].find({"group_id": {"$in": group_ids},
                                             "$or": [{"from_user_id": user["id"]}, {"to_user_id": user["id"]}]}):
            peer_id = item["to_user_id"] if item["from_user_id"] == user["id"] else item["from_user_id"]
            if peer_id in peers:
                peers[peer_id]["balance"] += float(item["amount"]) if item["from_user_id"] == user["id"] else -float(item["amount"])
        return [{**peer, "balance": round(peer["balance"], 2)} for peer in peers.values()]
    finally:
        client.close()
