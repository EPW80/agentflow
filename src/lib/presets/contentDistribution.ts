import { WorkflowNode } from '@/lib/nodeTypes';

export const contentDistribution = {
  name: 'Content Distribution Workflow',
  description:
    'Automates content distribution planning when new titles are added to the Helix platform.',
  nodes: [
    {
      id: 'cd-1',
      type: 'trigger',
      label: 'New Title Added',
      description: 'DynamoDB stream fires when a new title is ingested into Helix',
      config: { source: 'dynamodb-stream', table: 'helix-titles' },
    },
    {
      id: 'cd-2',
      type: 'reason',
      label: 'Analyze Metadata',
      description: 'Claude analyzes title metadata, genre, and market fit',
      config: { model: 'claude-sonnet', maxTokens: 2048 },
    },
    {
      id: 'cd-3',
      type: 'action',
      label: 'Generate Distribution Plan',
      description: 'Creates a distribution plan with territory and window recommendations',
      config: { service: 'lambda', function: 'generate-dist-plan' },
    },
    {
      id: 'cd-4',
      type: 'action',
      label: 'Notify Partners',
      description: 'Sends distribution notifications to relevant platform partners via SNS',
      config: { service: 'sns', topic: 'partner-notifications' },
    },
    {
      id: 'cd-5',
      type: 'handoff',
      label: 'Confirm Distribution',
      description: 'Logs the distribution plan and updates the Helix dashboard',
      config: { integration: 'helix-dashboard', action: 'update-status' },
    },
  ] as WorkflowNode[],
};
