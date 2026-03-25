import { WorkflowNode } from '@/lib/nodeTypes';

export const revenueAnomaly = {
  name: 'Revenue Anomaly Detection',
  description:
    'Monitors revenue streams for anomalies and alerts finance teams with AI-generated analysis.',
  nodes: [
    {
      id: 'ra-1',
      type: 'trigger',
      label: 'DynamoDB Stream',
      description: 'Fires when revenue records are updated in the transactions table',
      config: { source: 'dynamodb-stream', table: 'revenue-transactions' },
    },
    {
      id: 'ra-2',
      type: 'reason',
      label: 'Detect Anomaly',
      description: 'Claude analyzes revenue patterns and flags statistical outliers',
      config: { model: 'claude-sonnet', maxTokens: 2048 },
    },
    {
      id: 'ra-3',
      type: 'review',
      label: 'Human Verification',
      description: 'Finance analyst reviews the detected anomaly before escalation',
      config: {},
      humanInLoop: true,
    },
    {
      id: 'ra-4',
      type: 'action',
      label: 'Alert Finance',
      description: 'Sends an alert to the finance team with anomaly details via SNS',
      config: { service: 'sns', topic: 'finance-alerts' },
    },
    {
      id: 'ra-5',
      type: 'handoff',
      label: 'Dashboard Update',
      description: 'Updates the revenue monitoring dashboard with anomaly status',
      config: { integration: 'helix-dashboard', action: 'update-anomaly' },
    },
  ] as WorkflowNode[],
};
