# AgentFlow

A visual builder for composing, configuring, and simulating AI agent workflows on AWS. Design multi-step agent pipelines with drag-and-drop, run client-side simulations with human-in-the-loop controls, and export workflows as JSON or YAML.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)

## Features

- **Visual Workflow Builder** — Drag-and-drop canvas with 5 node types: Trigger, Reasoner, Action, Review, and Handoff
- **4 Media-Ops Presets** — Ticket Triage, Content Distribution, Licensing Check, and Revenue Anomaly Detection
- **Client-Side Simulation** — Step-through execution with realistic mock outputs and timing
- **Human-in-the-Loop** — First-class approve/reject controls on Review nodes that pause execution
- **Workflow Export** — Download workflows as JSON or YAML
- **Dark/Light Theme** — Toggle with localStorage persistence and system preference detection
- **Anthropic Claude Integration** — Optional real LLM calls for Reasoner nodes via Express proxy
- **Python Agent Runner** — FastAPI backend for production agent execution

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, TypeScript, Tailwind CSS, Vite |
| Backend | Node.js, Express, Python, FastAPI |
| AI/ML | Anthropic Claude (via AWS Bedrock), Claude SDK |
| Infrastructure | AWS Lambda, Step Functions, DynamoDB, SQS/SNS |
| Tools | Vitest, ESLint, Prettier, GitHub Actions CI |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Python 3.10+ (optional, for agent runner)

### Installation

```bash
git clone https://github.com/EPW80/agentflow.git
cd agentflow
npm install
```

### Environment

Copy the example environment file and configure as needed:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_DEMO_MODE` | Run with mock data (no API keys needed) | `true` |
| `VITE_API_URL` | Express API server URL | `http://localhost:3001` |
| `ANTHROPIC_API_KEY` | Anthropic API key (optional in demo mode) | — |
| `AGENT_RUNNER_URL` | Python FastAPI runner URL | `http://localhost:8000` |

### Running

```bash
# Start the frontend dev server
npm run dev

# Start the API server (optional, for real LLM calls)
node src/api/server.ts

# Start the Python agent runner (optional)
cd src/agents && uvicorn runner:app --reload
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + production build |
| `npm run test` | Run Vitest test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | ESLint + Prettier check |
| `npm run lint:fix` | Auto-fix lint and formatting issues |
| `npm run agent:test` | Run Python agent tests (pytest) |

## Project Structure

```
src/
  components/       # React UI — Canvas, NodeCard, Sidebar, Panel, Navbar
  hooks/            # useWorkflow, useAgentExec, useLogger, useTheme
  lib/              # Type system, node config, presets, mocks, export utils
  pages/            # Hero, Builder, UseCases, Architecture, Stack sections
  styles/           # CSS variable theme tokens
  api/              # Express server, Anthropic proxy, AWS stubs
  agents/           # Python FastAPI runner + 4 agent modules
  test/             # Test setup and utilities
```

## Architecture

AgentFlow follows a 4-layer architecture:

```
Event Sources        → Orchestration       → Action              → Output/Feedback
─────────────────────────────────────────────────────────────────────────────────
CloudWatch Events      AWS Step Functions     Lambda Functions      SNS Notifications
API Gateway            Agent Orchestrator     Bedrock (Claude)      DynamoDB State
S3 Events              Human Review Queue     External APIs         CloudWatch Metrics
SQS Messages                                  DynamoDB CRUD         Agent Handoff
```

## Testing

56 JavaScript/TypeScript tests and 13 Python tests cover:

- Hook logic (workflow state, simulation engine, logger)
- Component rendering and interaction
- Preset structure validation
- Export round-trip integrity
- Python agent `run()` contracts

```bash
npm run test              # JS/TS tests
cd src/agents && pytest   # Python tests
```

## License

MIT
