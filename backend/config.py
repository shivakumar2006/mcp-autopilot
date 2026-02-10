from pydantic_settings import BaseSettings
from typing import Optional 

class Settings(BaseSettings): 
    BACKEND_URL: str = "http://localhost:8000"
    BACKEND_PORT: int = 8000
    
    # Database
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_DB_NAME: str = "autopilot"
    
    
    # Archestra
    ARCHESTRA_URL: str = "http://localhost:9000"
    ARCHESTRA_MCP_ENDPOINT: str = ""
    ARCHESTRA_LLM_PROXY: str = ""
    ARCHESTRA_AUTH_TOKEN: str = ""
    
    # Ollama
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3.2:3b"
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    LOG_LEVEL: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()