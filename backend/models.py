from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
from datetime import datetime
from enum import Enum

class WorkflowStatus(str, Enum):
    DRAFT = "draft"
    PLANNING = "planning"
    DEPLOYING = "deploying"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"

class TaskStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"

class MCPType(str, Enum):
    EXTRACTOR = "extractor"
    TRANSFORMER = "transformer"
    ANALYZER = "analyzer"
    GENERATOR = "generator"
    NOTIFIER = "notifier"
    CUSTOM = "custom"

# ========== Request Models ==========

class WorkflowCreateRequest(BaseModel):
    description: str = Field(..., min_length=10, max_length=2000)
    name: Optional[str] = None
    tags: Optional[List[str]] = []

class MCPConfig(BaseModel):
    mcp_id: str
    config: Dict[str, Any] = {}

class WorkflowDeployRequest(BaseModel):
    workflow_id: str
    mcps: List[MCPConfig]

class ScheduleConfig(BaseModel):
    type: str = Field(..., pattern="^(once|hourly|daily|weekly)$")
    time: Optional[str] = None  # For daily/weekly
    interval: Optional[int] = None  # For hourly

# ========== Response Models ==========

class WorkflowPlan(BaseModel):
    workflow_id: str
    name: str
    description: str
    steps: List[Dict[str, Any]]
    mcps_needed: List[str]
    estimated_duration: int
    complexity: str

class MCPInfo(BaseModel):
    mcp_id: str
    name: str
    type: MCPType
    description: str
    inputs: Dict[str, str]
    outputs: Dict[str, str]

class WorkflowResponse(BaseModel):
    workflow_id: str
    name: str
    description: str
    status: WorkflowStatus
    plan: WorkflowPlan
    mcps: List[MCPInfo]
    created_at: datetime
    updated_at: datetime

class TaskResponse(BaseModel):
    task_id: str
    workflow_id: str
    status: TaskStatus
    mcp_id: str
    input: Dict[str, Any]
    output: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    created_at: datetime
    completed_at: Optional[datetime] = None

class MonitoringData(BaseModel):
    workflow_id: str
    status: WorkflowStatus
    tasks_total: int
    tasks_completed: int
    tasks_failed: int
    progress_percentage: int
    current_step: str
    last_update: datetime
    errors: List[str] = []