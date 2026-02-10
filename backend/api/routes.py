from fastapi import APIRouter, HTTPException, WebSocket
from models import WorkflowCreateRequest, WorkflowResponse, MonitoringData
from core.workflow_planner import workflow_planner
from core.orchestrator import orchestrator
from core.scheduler import scheduler
from database import db
from services.archestra import archestra_service
from datetime import datetime
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["workflows"])

# ========== Workflow Endpoints ==========

@router.post("/workflows/plan")
async def plan_workflow(request: WorkflowCreateRequest):
    """Plan workflow from description"""
    
    try:
        plan = await workflow_planner.plan(request.description)
        
        if "error" in plan:
            raise HTTPException(status_code=400, detail=plan["error"])
        
        # Save to database
        await db.db.workflows.insert_one(plan)
        
        return {
            "status": "success",
            "workflow_id": plan["workflow_id"],
            "name": plan["name"],
            "plan": plan["plan"]
        }
    except Exception as e:
        logger.error(f"Planning error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/workflows/{workflow_id}/deploy")
async def deploy_workflow(workflow_id: str):
    """Deploy workflow"""
    
    try:
        # Get workflow
        workflow = await db.db.workflows.find_one({"workflow_id": workflow_id})
        
        if not workflow:
            raise HTTPException(status_code=404, detail="Workflow not found")
        
        # Get suggested MCPs
        mcps = workflow.get("suggested_mcps", [])
        
        if not mcps:
            raise HTTPException(status_code=400, detail="No MCPs suggested")
        
        # Deploy
        result = await orchestrator.deploy_workflow(workflow_id, mcps)
        
        # Update workflow
        await db.db.workflows.update_one(
            {"workflow_id": workflow_id},
            {"$set": {
                "status": "deployed",
                "deployed_mcps": result["deployed_mcps"],
                "updated_at": datetime.utcnow()
            }}
        )
        
        return result
    except Exception as e:
        logger.error(f"Deployment error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/workflows/{workflow_id}/execute")
async def execute_workflow(workflow_id: str):
    """Execute workflow"""
    
    try:
        # Get workflow
        workflow = await db.db.workflows.find_one({"workflow_id": workflow_id})
        
        if not workflow:
            raise HTTPException(status_code=404, detail="Workflow not found")
        
        if workflow.get("status") != "deployed":
            raise HTTPException(status_code=400, detail="Workflow not deployed")
        
        # Get task order
        tasks = [m["mcp_id"] for m in workflow.get("deployed_mcps", [])]
        
        # Execute
        result = await orchestrator.execute_workflow(workflow_id, tasks, {})
        
        # Save results
        await db.db.workflows.update_one(
            {"workflow_id": workflow_id},
            {"$set": {
                "status": "running",
                "last_executed": datetime.utcnow()
            }}
        )
        
        return result
    except Exception as e:
        logger.error(f"Execution error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/workflows/{workflow_id}/status")
async def get_workflow_status(workflow_id: str):
    """Get workflow status"""
    
    try:
        workflow = await db.db.workflows.find_one({"workflow_id": workflow_id})
        
        if not workflow:
            raise HTTPException(status_code=404, detail="Workflow not found")
        
        return {
            "workflow_id": workflow_id,
            "name": workflow.get("name"),
            "status": workflow.get("status"),
            "created_at": workflow.get("created_at"),
            "updated_at": workflow.get("updated_at")
        }
    except Exception as e:
        logger.error(f"Status error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/workflows")
async def list_workflows(skip: int = 0, limit: int = 10):
    """List all workflows"""
    
    try:
        workflows = await db.db.workflows.find().skip(skip).limit(limit).to_list(limit)
        
        return {
            "status": "success",
            "total": await db.db.workflows.count_documents({}),
            "workflows": [
                {
                    "workflow_id": w["workflow_id"],
                    "name": w.get("name"),
                    "status": w.get("status"),
                    "created_at": w.get("created_at")
                }
                for w in workflows
            ]
        }
    except Exception as e:
        logger.error(f"List error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health():
    """Health check"""
    archestra_ok = await archestra_service.health_check()
    
    return {
        "status": "healthy",
        "service": "MCP Autopilot",
        "archestra": "connected" if archestra_ok else "disconnected"
    }