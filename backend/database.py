from motor.motor_asyncio import AsyncClient, AsyncDatabase 
from pymongo import ASCENDING, DESCENDING
from config import settings 
from typing import Optional 
import logging

logger = logging.getLogger(__name__)

class Database:
    client: Optional[AsyncClient] = None 
    db: Optional[AsyncDatabase] = None 

db = Database()

async def connect_to_mongo(): 
    "connect to mongo"
    db.client = AnyClient(settings.MONGODB_URL)
    db.db = db.client(settings.MONGODB_DB_NAME)

    # collections 
    await db.db.workflows.create_index("workflow_id", unique=True)
    await db.db.workflows.create_index("created_at", direction=DESCENDING)
    await db.db.workflows.create_index("status")

    await db.db.mcps.create_index("mcp_id", unique=True)
    await db.db.mcps.create_index("created_at", direction=DESCENDING)

    await db.db.tasks.create_index("task_id", unique=True)
    await db.db.tasks.create_index("workflow_id")
    await db.db.tasks.create_index("status")

    await db.db.logs.create_index("workflow_id")
    await db.db.logs.create_index("created_at", direction=DESCENDING)

    logger.info("connected to mongoDB")

async def close_mongo_connection():
    if db.client: 
        db.client.close()
        logger.info("closed mongodb connection")

async def get_database(): 
    return db.db 

