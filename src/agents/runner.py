"""AgentFlow Python Agent Runner — FastAPI bridge for workflow agents."""

import importlib
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="AgentFlow Runner", version="1.0.0")


class RunRequest(BaseModel):
    workflow_name: str
    event: dict = {}
    context: dict = {}


class RunResponse(BaseModel):
    status: str
    output: str
    next_action: str | None = None


@app.post("/run", response_model=RunResponse)
async def run_agent(request: RunRequest):
    module_name = f"agent_{request.workflow_name}"
    try:
        module = importlib.import_module(module_name)
    except ModuleNotFoundError:
        raise HTTPException(
            status_code=404,
            detail=f"Agent '{module_name}' not found",
        )

    if not hasattr(module, "run"):
        raise HTTPException(
            status_code=500,
            detail=f"Agent '{module_name}' missing run(event, context) entrypoint",
        )

    result = module.run(request.event, request.context)
    return RunResponse(
        status=result.get("status", "complete"),
        output=result.get("output", ""),
        next_action=result.get("next_action"),
    )


@app.get("/health")
async def health():
    return {"status": "ok"}
