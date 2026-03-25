export type NodeType = 'trigger' | 'reason' | 'action' | 'review' | 'handoff';

export interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  description: string;
  config: Record<string, unknown>;
  humanInLoop?: boolean;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  nodes: WorkflowNode[];
  createdAt: string;
}

export type ExecutionStatus = 'pending' | 'running' | 'complete' | 'error' | 'waiting-human';

export interface ExecutionStep {
  nodeId: string;
  status: ExecutionStatus;
  output?: string;
  startedAt?: number;
  completedAt?: number;
}
