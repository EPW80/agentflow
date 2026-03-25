import { WorkflowNode } from '@/lib/nodeTypes';

export const licensingCheck = {
  name: 'Licensing Compliance Check',
  description:
    'Validates content licensing rights across territories and windows, flagging violations for legal review.',
  nodes: [
    {
      id: 'lc-1',
      type: 'trigger',
      label: 'Scheduled Audit',
      description: 'Runs on a cron schedule or triggered manually for compliance checks',
      config: { source: 'eventbridge', schedule: 'rate(1 day)' },
    },
    {
      id: 'lc-2',
      type: 'action',
      label: 'Fetch Rights Data',
      description: 'Queries DynamoDB for current licensing rights and active windows',
      config: { service: 'dynamodb', table: 'licensing-rights' },
    },
    {
      id: 'lc-3',
      type: 'reason',
      label: 'Check Territory & Window',
      description: 'Claude validates that distribution matches licensed territories and windows',
      config: { model: 'claude-sonnet', maxTokens: 2048 },
    },
    {
      id: 'lc-4',
      type: 'review',
      label: 'Flag Violations',
      description: 'Surfaces any compliance issues for human review and approval',
      config: {},
      humanInLoop: true,
    },
    {
      id: 'lc-5',
      type: 'handoff',
      label: 'Escalate to Legal',
      description: 'Sends violation report to the legal team via email and Slack',
      config: { integration: 'slack', channel: '#legal-compliance' },
    },
  ] as WorkflowNode[],
};
