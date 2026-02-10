from typing import Dict, Any, List
from datetime import datetime
from services.llm import llm_service
import uuid
import logging

logger = logging.getLogger(__name__)

class WorkflowPlanner:
    """Plan workflows from user descriptions"""
    
    async def plan(self, user_description: str) -> Dict[str, Any]:
        """Create workflow plan"""
        
        logger.info(f"Planning workflow: {user_description[:50]}...")
        
        # Get LLM plan
        llm_plan = await llm_service.plan_workflow(user_description)
        
        if "error" in llm_plan:
            return llm_plan
        
        # Get MCP suggestions
        suggested_mcps = await llm_service.suggest_mcps(llm_plan)
        
        # Build workflow object
        workflow = {
            "workflow_id": str(uuid.uuid4()),
            "name": llm_plan.get("workflow_name", "Unnamed Workflow"),
            "description": user_description,
            "plan": llm_plan,
            "suggested_mcps": suggested_mcps,
            "status": "planning",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        logger.info(f"Workflow planned: {workflow['workflow_id']}")
        return workflow

workflow_planner = WorkflowPlanner()