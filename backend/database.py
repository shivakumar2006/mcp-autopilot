from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo import DESCENDING
from config import settings
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class Database:
    client: Optional[AsyncIOMotorClient] = None
    db: Optional[AsyncIOMotorDatabase] = None

db = Database()

async def connect_to_mongo():
    """Connect to MongoDB"""
    db.client = AsyncIOMotorClient(settings.MONGODB_URL)
    db.db = db.client[settings.MONGODB_DB_NAME]

    # collections indexes
    await db.db.workflows.create_index("workflow_id", unique=True)
    await db.db.workflows.create_index([("created_at", DESCENDING)])
    await db.db.workflows.create_index("status")

    await db.db.mcps.create_index("mcp_id", unique=True)
    await db.db.mcps.create_index([("created_at", DESCENDING)])

    await db.db.tasks.create_index("task_id", unique=True)
    await db.db.tasks.create_index("workflow_id")
    await db.db.tasks.create_index("status")

    await db.db.logs.create_index("workflow_id")
    await db.db.logs.create_index([("created_at", DESCENDING)])

    logger.info("✅ Connected to MongoDB")

async def close_mongo_connection():
    if db.client:
        db.client.close()
        logger.info("❌ Closed MongoDB connection")

async def get_database():
    return db.db
