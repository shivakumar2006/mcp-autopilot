from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from config import settings
from database import connect_to_mongo, close_mongo_connection
from api.routes import router
from core.scheduler import scheduler
import logging

# Setup logging
logging.basicConfig(level=settings.LOG_LEVEL)
logger = logging.getLogger(__name__)

# ========== Startup/Shutdown ==========

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("🚀 Starting MCP Autopilot...")
    await connect_to_mongo()
    scheduler.start()
    logger.info("✅ MCP Autopilot ready!")
    
    yield
    
    # Shutdown
    logger.info("🛑 Shutting down...")
    scheduler.stop()
    await close_mongo_connection()
    logger.info("✅ Shutdown complete")

# ========== Create App ==========

app = FastAPI(
    title="MCP Autopilot",
    description="AI-Powered Autonomous Workflow Engine",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(router)

# ========== WebSocket ==========

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket for real-time updates"""
    await websocket.accept()
    
    try:
        while True:
            data = await websocket.receive_text()
            # Echo back
            await websocket.send_text(f"Echo: {data}")
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
    finally:
        await websocket.close()

# ========== Root ==========

@app.get("/")
async def root():
    return {
        "name": "MCP Autopilot",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.BACKEND_PORT)