import { Router, Request, Response } from 'express';
import { reasonWithClaude } from '../services/anthropic';

export const agentRouter = Router();

agentRouter.post('/reason', async (req: Request, res: Response) => {
  try {
    const { prompt, context } = req.body;
    if (!prompt) {
      res.status(400).json({ error: 'prompt is required' });
      return;
    }
    const result = await reasonWithClaude(prompt, context ?? {});
    res.json({ result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

agentRouter.post('/run', async (req: Request, res: Response) => {
  try {
    const { workflowName, event, context } = req.body;
    if (!workflowName) {
      res.status(400).json({ error: 'workflowName is required' });
      return;
    }

    const runnerUrl = process.env.AGENT_RUNNER_URL ?? 'http://localhost:8000';
    const response = await fetch(`${runnerUrl}/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workflow_name: workflowName, event, context }),
    });

    if (!response.ok) {
      res.status(response.status).json({ error: 'Agent runner returned an error' });
      return;
    }

    const result = await response.json();
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(502).json({ error: `Agent runner unavailable: ${message}` });
  }
});
