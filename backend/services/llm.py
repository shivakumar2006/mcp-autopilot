import httpx
import json
from config import settings
from typing import Dict, Any, List
import logging

logger = logging.getLogger(__name__)

class LLMService:
    """LLM Service via Archestra"""
    
    def __init__(self):
        self.llm_proxy = settings.ARCHESTRA_LLM_PROXY
        self.auth_token = settings.ARCHESTRA_AUTH_TOKEN
    
    async def plan_workflow(self, user_description: str) -> Dict[str, Any]:
        """Use LLM to plan workflow"""
        
        prompt = f"""Analyze this user request and create a workflow plan:

User Request: "{user_description}"

Return JSON with:
{{
    "workflow_name": "descriptive name",
    "workflow_description": "brief description",
    "steps": [
        {{"step": 1, "name": "step name", "mcp_type": "extractor|transformer|analyzer|generator|notifier"}}
    ],
    "mcps_needed": ["type1", "type2"],
    "data_flow": "input → step1 → step2 → output",
    "estimated_duration": minutes,
    "complexity": "simple|medium|advanced"
}}

Return ONLY valid JSON."""
        
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(
                    self.llm_proxy,
                    json={
                        "model": settings.OLLAMA_MODEL,
                        "prompt": prompt,
                        "stream": False,
                        "temperature": 0.3
                    },
                    headers={"Authorization": f"Bearer {self.auth_token}"}
                )
                
                if response.status_code == 200:
                    result = response.json()
                    text = result.get("response", "")
                    
                    # Extract JSON
                    try:
                        json_start = text.find('{')
                        json_end = text.rfind('}') + 1
                        if json_start >= 0:
                            json_str = text[json_start:json_end]
                            plan = json.loads(json_str)
                            logger.info("Workflow planned by LLM")
                            return plan
                    except:
                        pass
                
                return {"error": "Failed to plan workflow"}
        except Exception as e:
            logger.error(f"LLM error: {e}")
            return {"error": str(e)}
    
    async def suggest_mcps(self, workflow_plan: Dict[str, Any]) -> List[str]:
        """Suggest MCPs for workflow"""
        
        steps = workflow_plan.get("steps", [])
        step_names = ", ".join([s.get("name", "") for s in steps])
        
        prompt = f"""Given these workflow steps, suggest specific MCPs:

Steps: {step_names}

Return JSON:
{{
    "mcps": [
        {{"name": "MCP Name", "type": "type", "description": "desc"}},
    ]
}}

Return ONLY JSON."""
        
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(
                    self.llm_proxy,
                    json={
                        "model": settings.OLLAMA_MODEL,
                        "prompt": prompt,
                        "stream": False,
                        "temperature": 0.2
                    },
                    headers={"Authorization": f"Bearer {self.auth_token}"}
                )
                
                if response.status_code == 200:
                    result = response.json()
                    text = result.get("response", "")
                    
                    try:
                        json_start = text.find('{')
                        json_end = text.rfind('}') + 1
                        json_str = text[json_start:json_end]
                        data = json.loads(json_str)
                        return data.get("mcps", [])
                    except:
                        pass
                
                return []
        except Exception as e:
            logger.error(f"MCP suggestion error: {e}")
            return []

llm_service = LLMService()