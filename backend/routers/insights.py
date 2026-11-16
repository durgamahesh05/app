"""Expense-derived insights."""

from datetime import datetime, timezone

from fastapi import APIRouter

from database import get_database
from main import CurrentUser

router = APIRouter(prefix="/api/insights", tags=["insights"])


def _summary(user: dict):
    client, db = get_database()
    try:
        expenses = list(db["expenses"].find({"$or": [
            {"paid_by": user["id"]}, {"participants": user["id"]},
        ]}, {"amount": 1, "created_at": 1, "description": 1}))
        month_start = datetime.now(timezone.utc).replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        month_expenses = []
        for expense in expenses:
            created_at = expense.get("created_at")
            if created_at and created_at.tzinfo is None:
                created_at = created_at.replace(tzinfo=timezone.utc)
            if created_at and created_at >= month_start:
                month_expenses.append(expense)
        category_totals: dict[str, float] = {}
        for expense in month_expenses:
            user_split = next((split for split in expense.get("splits", [])
                               if split.get("userId") == user["id"]), None)
            user_amount = float(user_split["amount"]) if user_split else (
                float(expense["amount"]) if expense.get("paid_by") == user["id"] else 0
            )
            if user_amount <= 0:
                continue
            category = expense.get("category") or "Other"
            category_totals[category] = category_totals.get(category, 0) + user_amount
        total = round(sum(category_totals.values()), 2)
        categories = [{"name": name, "amount": round(amount, 2),
                       "percentage": round(amount / total * 100) if total else 0}
                      for name, amount in sorted(category_totals.items(), key=lambda item: -item[1])]
        return {"total": total, "currency": "INR", "categories": categories,
                "expenseCount": sum(1 for expense in month_expenses if
                                     any(split.get("userId") == user["id"] for split in expense.get("splits", []))
                                     or expense.get("paid_by") == user["id"]),
                "period": month_start.strftime("%Y-%m")}
    finally:
        client.close()


@router.get("/summary")
def summary(user: CurrentUser):
    return _summary(user)


@router.get("/analytics")
def analytics(user: CurrentUser):
    return _summary(user)
