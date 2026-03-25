import { WorkflowNode, ExecutionStep } from '@/lib/nodeTypes';
import { NODE_META } from '@/lib/nodeConfig';

interface NodeCardProps {
  node: WorkflowNode;
  index: number;
  isSelected: boolean;
  executionStep?: ExecutionStep;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (index: number) => void;
  onApprove?: (nodeId: string) => void;
  onReject?: (nodeId: string) => void;
}

export function NodeCard({
  node,
  index,
  isSelected,
  executionStep,
  onSelect,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
  onApprove,
  onReject,
}: NodeCardProps) {
  const meta = NODE_META[node.type];
  const status = executionStep?.status;

  const statusStyles: Record<string, string> = {
    pending: 'opacity-60',
    running: 'ring-2 ring-offset-2 ring-offset-[var(--color-bg)] animate-pulse',
    complete: 'ring-2 ring-green-500',
    error: 'ring-2 ring-red-500',
    'waiting-human': 'ring-2 ring-yellow-400 animate-pulse',
  };

  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={() => onDrop(index)}
      onClick={() => onSelect(node.id)}
      className={`relative rounded-lg p-4 cursor-pointer transition-all border-l-4 ${
        isSelected ? 'ring-2 ring-[var(--color-primary)]' : ''
      } ${status ? statusStyles[status] || '' : ''}`}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderLeftColor: meta.color,
      }}
      role="button"
      aria-label={`${node.label} node`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label={node.type}>
            {meta.icon}
          </span>
          <div>
            <div className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
              {node.label}
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              {node.description}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {node.humanInLoop && (
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: 'var(--color-node-review)',
                color: 'white',
              }}
            >
              Human-in-Loop
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(node.id);
            }}
            className="text-sm opacity-50 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--color-text-muted)' }}
            aria-label={`Remove ${node.label}`}
          >
            ✕
          </button>
        </div>
      </div>

      {executionStep?.output && status === 'complete' && (
        <div
          className="mt-3 text-xs p-2 rounded"
          style={{
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text-muted)',
          }}
        >
          {executionStep.output}
        </div>
      )}

      {status === 'waiting-human' && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApprove?.(node.id);
            }}
            className="text-xs px-3 py-1 rounded bg-green-600 text-white hover:bg-green-500"
          >
            Approve
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReject?.(node.id);
            }}
            className="text-xs px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
