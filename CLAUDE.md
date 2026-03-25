# AgentFlow — AI Workflow Automation Platform

> Visual builder for composing, configuring, and simulating AI agent workflows on AWS.

## Stack

- **Frontend**: React 18 + TypeScript, Tailwind CSS
- **Backend**: Node.js + Express, Python (agent logic)
- **Infra**: AWS (Lambda, Step Functions, DynamoDB, SQS/SNS, Bedrock, Agent Core)
- **Tools**: Vite, ESLint, Prettier, Vitest, GitHub Actions CI

## Project Structure

```
src/
  components/       # React components (Canvas, Sidebar, Panel, NodeCard)
  hooks/            # Custom hooks (useWorkflow, useAgentExec, useLogger)
  lib/              # Agent definitions, preset configs, type utils
  pages/            # Route-level views (Builder, UseCases, Architecture)
  styles/           # Tailwind config, CSS variables, theme tokens
  api/              # Express routes + Python agent runner bridge
  agents/           # Python agent definitions (ticket-triage, content-ops, etc.)
  tests/            # Vitest unit + integration tests
```

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run test         # Run Vitest suite
npm run lint         # ESLint + Prettier check
npm run agent:test   # Run Python agent unit tests (pytest)
```

## Conventions

- All colors via CSS variables in `src/styles/theme.ts`. Never hardcode hex values.
- Agent node types: `trigger`, `reason`, `action`, `review`, `handoff`. Don't invent new types without updating `src/lib/nodeTypes.ts`.
- Workflow presets live in `src/lib/presets/`. Each preset exports `{ name, nodes[] }`.
- Canvas rendering is pure — driven by `currentNodes` state array. No direct DOM mutation in React components.
- API actions must have a corresponding mock in `src/lib/mocks/` for offline demo mode.
- Python agent files follow the naming pattern `agent_{workflow_name}.py` and expose a `run(event, context)` entrypoint.

## Key Design Decisions

- Single-page app with scroll-anchored sections (Hero, Builder, Use Cases, Architecture, Stack).
- Builder uses a vertical node chain layout, not a free-form graph. Keeps it simple and readable.
- Workflow execution is simulated client-side for demo. Backend agent runner is the production path.
- Human-in-the-loop is a first-class toggle, not an afterthought.

## Testing

- Run `npm run test` before committing. All tests must pass.
- Every new preset needs a corresponding test in `tests/presets/`.
- Agent Python tests: `cd src/agents && pytest`.

## Domain Context

- Agent use cases are relevant to media ops: ticket triage, content distribution workflows, licensing checks, revenue anomaly detection.
- AWS Agent Core is the target runtime. Bedrock (Claude) is the LLM provider.
- For architecture diagrams and descriptions, use the 4-layer model: Event Sources → Orchestration → Action → Output/Feedback.

## TODO

- [x] P0: Convert single HTML file into React + Vite project structure
- [x] P0: Implement drag-and-drop node reordering on canvas
- [x] P1: Add real Anthropic API call for LLM Reasoner node demo
- [x] P1: Build Python agent runner with FastAPI bridge
- [x] P2: Add workflow export as JSON/YAML
- [x] P2: Add dark/light theme toggle
- [ ] P3: Connect to actual AWS services (Lambda invoke, DynamoDB state)
