import { NodeType } from './nodeTypes';

export interface NodeMeta {
  icon: string;
  color: string;
  defaultLabel: string;
  defaultDescription: string;
  allowedNext: NodeType[];
}

export const NODE_META: Record<NodeType, NodeMeta> = {
  trigger: {
    icon: '⚡',
    color: 'var(--color-node-trigger)',
    defaultLabel: 'Event Trigger',
    defaultDescription: 'Starts the workflow when an event occurs',
    allowedNext: ['reason', 'action'],
  },
  reason: {
    icon: '🧠',
    color: 'var(--color-node-reason)',
    defaultLabel: 'LLM Reasoner',
    defaultDescription: 'Analyzes input using Claude on Bedrock',
    allowedNext: ['action', 'review', 'handoff'],
  },
  action: {
    icon: '⚙️',
    color: 'var(--color-node-action)',
    defaultLabel: 'Action',
    defaultDescription: 'Executes an operation (API call, Lambda, etc.)',
    allowedNext: ['reason', 'action', 'review', 'handoff'],
  },
  review: {
    icon: '👁️',
    color: 'var(--color-node-review)',
    defaultLabel: 'Human Review',
    defaultDescription: 'Pauses for human approval before continuing',
    allowedNext: ['action', 'handoff'],
  },
  handoff: {
    icon: '🤝',
    color: 'var(--color-node-handoff)',
    defaultLabel: 'Handoff',
    defaultDescription: 'Delivers result to an external system or team',
    allowedNext: [],
  },
};

export const NODE_TYPES = Object.keys(NODE_META) as NodeType[];
