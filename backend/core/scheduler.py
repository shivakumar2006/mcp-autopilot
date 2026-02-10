from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from apscheduler.triggers.interval import IntervalTrigger
from typing import Dict, Any, Callable
import logging

logger = logging.getLogger(__name__)

class WorkflowScheduler:
    """Schedule workflow execution"""
    
    def __init__(self):
        self.scheduler = AsyncIOScheduler()
        self.jobs: Dict[str, Any] = {}
    
    def start(self):
        """Start scheduler"""
        if not self.scheduler.running:
            self.scheduler.start()
            logger.info("Scheduler started")
    
    def stop(self):
        """Stop scheduler"""
        if self.scheduler.running:
            self.scheduler.shutdown()
            logger.info("Scheduler stopped")
    
    async def schedule_workflow(
        self,
        workflow_id: str,
        trigger_type: str,  # once, hourly, daily, weekly
        callback: Callable,
        **trigger_args
    ) -> bool:
        """Schedule workflow execution"""
        
        try:
            if trigger_type == "once":
                self.scheduler.add_job(
                    callback,
                    "date",
                    id=workflow_id,
                    args=[workflow_id]
                )
            elif trigger_type == "hourly":
                self.scheduler.add_job(
                    callback,
                    IntervalTrigger(hours=1),
                    id=workflow_id,
                    args=[workflow_id]
                )
            elif trigger_type == "daily":
                self.scheduler.add_job(
                    callback,
                    CronTrigger(hour=trigger_args.get("hour", 0)),
                    id=workflow_id,
                    args=[workflow_id]
                )
            elif trigger_type == "weekly":
                self.scheduler.add_job(
                    callback,
                    CronTrigger(
                        day_of_week=trigger_args.get("day_of_week", "mon"),
                        hour=trigger_args.get("hour", 0)
                    ),
                    id=workflow_id,
                    args=[workflow_id]
                )
            
            self.jobs[workflow_id] = {"trigger_type": trigger_type}
            logger.info(f"Workflow scheduled: {workflow_id}")
            return True
        except Exception as e:
            logger.error(f"Scheduling error: {e}")
            return False
    
    def unschedule_workflow(self, workflow_id: str) -> bool:
        """Remove scheduled workflow"""
        try:
            self.scheduler.remove_job(workflow_id)
            del self.jobs[workflow_id]
            logger.info(f"Workflow unscheduled: {workflow_id}")
            return True
        except Exception as e:
            logger.error(f"Unscheduling error: {e}")
            return False

scheduler = WorkflowScheduler()