import httpx 
from config import settings 
from typing import Optional, Dict, Any 
import logging 

logger = logging.getLogger(__name__)

class ArchestraService:
    def __init__(self):
        self.base_url = settings.ARCHESTRA_URL
        self.mcp_endpoint = settings.ARCHESTRA_MCP_ENDPOINT
        self.llm_proxy = settings.ARCHESTRA_LLM_PROXY
        self.auth_token = settings.ARCHESTRA_AUTH_TOKEN

    async def health_check(self) -> bool: 
        try: 
            async with httpx.AsyncClient(timeout=5.0) as client:
                response = await client.get(f"{self.base_url}/health")
                is_healthy = response.status_code == 200 
                logger.info(f"Archestra health: {is_healthy}")
                return is_healthy
        except Exception as e: 
            logger.error(f"archestra health check failed : {e}")
            return False 

    async def register_mcp(self, mcp_id: str, mcp_name: str, endpoint: str) -> Dict[str, Any]:
        try: 
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(
                    f"{self.base_url}/v1/mcp/register",
                    json={
                        "id": mcp_id,
                        "name": mcp_name,
                        "endpoint": endpoint,
                        "protocol": "openai-compatible"
                    },
                    headers={"Authorization": f"Bearer {self.auth_token}"}
                )

                if response.status_code in [200, 201]:
                     logger.info(f"MCP registered: {mcp_id}")
                     return { "success": True, "mcp_id": mcp_id}
                else: 
                    logger.error(f"Failed to register MCP: {response.text}")
                    return {"success": False, "error": response.text}
        except Exception as e:
            logger.error(f"MCP registration error: {e}")
            return {"success": False, "error": str(e)}
    
    async def unregister_mcp(self, mcp_id: str) -> bool:
        """Unregister MCP from Archestra"""
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(
                    f"{self.base_url}/v1/mcp/unregister",
                    json={"id": mcp_id},
                    headers={"Authorization": f"Bearer {self.auth_token}"}
                )
                return response.status_code == 200
        except Exception as e:
            logger.error(f"MCP unregistration error: {e}")
            return False
    
    async def list_mcps(self) -> list:
        """List all MCPs in Archestra"""
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(
                    f"{self.base_url}/v1/mcp/list",
                    headers={"Authorization": f"Bearer {self.auth_token}"}
                )
                
                if response.status_code == 200:
                    return response.json().get("mcps", [])
                return []
        except Exception as e:
            logger.error(f"List MCPs error: {e}")
            return []
    
    async def call_mcp(self, mcp_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Call MCP endpoint"""
        try:
            mcps = await self.list_mcps()
            mcp = next((m for m in mcps if m.get("id") == mcp_id), None)
            
            if not mcp:
                return {"error": f"MCP {mcp_id} not found"}
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{mcp['endpoint']}/analyze",
                    json=data,
                    headers={"Authorization": f"Bearer {self.auth_token}"}
                )
                
                if response.status_code == 200:
                    return response.json()
                else:
                    return {"error": f"MCP call failed: {response.text}"}
        except Exception as e:
            logger.error(f"MCP call error: {e}")
            return {"error": str(e)}

archestra_service = ArchestraService()
