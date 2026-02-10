from typing import Dict, Any, List
from datetime import datetime
from services.archestra import archestra_service
import asyncio
import uuid
import logging

logger = logging.getLogger(__name__)

class Orchestrator:
    """Orchestrate MCPs in workflows"""
    
    async def deploy_workflow(self, workflow_id: str, mcps: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Deploy workflow with MCPs"""
        
        logger.info(f"Deploying workflow: {workflow_id}")
        
        deployed_mcps = []
        tasks = []
        
        # Register all MCPs
        for mcp in mcps:
            mcp_id = mcp.get("mcp_id", str(uuid.uuid4()))
            mcp_name = mcp.get("name", "Unknown MCP")
            endpoint = mcp.get("endpoint", "")
            
            result = await archestra_service.register_mcp(mcp_id, mcp_name, endpoint)
            
            if result.get("success"):
                deployed_mcps.append({
                    "mcp_id": mcp_id,
                    "name": mcp_name,
                    "status": "deployed"
                })
                tasks.append(mcp_id)
        
        logger.info(f"Deployed {len(deployed_mcps)} MCPs")
        
        return {
            "workflow_id": workflow_id,
            "deployed_mcps": deployed_mcps,
            "task_order": tasks,
            "status": "deployed",
            "deployed_at": datetime.utcnow()
        }
    
    async def execute_workflow(self, workflow_id: str, tasks: List[str], input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute workflow tasks"""
        
        logger.info(f"Executing workflow: {workflow_id}")
        
        results = {}
        current_data = input_data
        
        for task_id in tasks:
            logger.info(f"Executing task: {task_id}")
            
            # Call MCP
            result = await archestra_service.call_mcp(task_id, current_data)
            results[task_id] = result
            
            # Use output as input for next task
            if "error" not in result:
                current_data = result
        
        logger.info(f"Workflow completed: {workflow_id}")
        
        return {
            "workflow_id": workflow_id,
            "results": results,
            "completed_at": datetime.utcnow()
        }

orchestrator = Orchestrator()