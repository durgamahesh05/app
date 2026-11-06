"""MongoDB connection helpers for the Merizo backend."""

import os
from pathlib import Path

from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.database import Database


load_dotenv(Path(__file__).with_name(".env"))


def get_database() -> tuple[MongoClient, Database]:
    """Return a connected MongoClient and the configured application database."""
    uri = os.getenv("MONGODB_URL")
    database_name = os.getenv("MONGODB_DATABASE")
    if not uri or not database_name:
        raise RuntimeError("Set MONGODB_URL and MONGODB_DATABASE in backend/.env")

    client = MongoClient(uri, serverSelectionTimeoutMS=10_000)
    client.admin.command("ping")
    database = client[database_name]
    database["users"].create_index("email", unique=True)
    return client, database
