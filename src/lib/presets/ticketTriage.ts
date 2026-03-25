import { WorkflowNode } from '@/lib/nodeTypes';

export const ticketTriage = {
  name: 'Ticket Triage Agent',
  description:
    'Automatically classifies, prioritizes, and routes support tickets using AI reasoning on Bedrock.',
  nodes: [
    {
      id: 'tt-1',
      type: 'trigger',
      label: 'SQS Event',
      description: 'Triggered when a new support ticket arrives via SQS',
      config: { source: 'sqs', queue: 'support-tickets' },
    },
    {
      id: 'tt-2',
      type: 'reason',
      label: 'Classify & Prioritize',
      description: 'Claude on Bedrock classifies ticket category and priority',
      config: { model: 'claude-sonnet', maxTokens: 1024 },
    },
    {
      id: 'tt-3',
      type: 'action',
      label: 'Route to Team',
      description: 'Routes ticket to the appropriate team based on classification',
      config: { service: 'lambda', function: 'route-ticket' },
    },
    {
      id: 'tt-4',
      type: 'review',
      label: 'Human Verification',
      description: 'High-priority tickets pause for human review before routing',
      config: {},
      humanInLoop: true,
    },
    {
      id: 'tt-5',
      type: 'handoff',
      label: 'Update Jira',
      description: 'Creates or updates the Jira ticket with classification and assignment',
      config: { integration: 'jira', action: 'create-issue' },
    },
  ] as WorkflowNode[],
};
