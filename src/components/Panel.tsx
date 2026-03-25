import { WorkflowNode } from '@/lib/nodeTypes';
import { NODE_META } from '@/lib/nodeConfig';

interface PanelProps {
  node: WorkflowNode | null;
  onUpdate: (id: string, updates: Partial<WorkflowNode>) => void;
}

export function Panel({ node, onUpdate }: PanelProps) {
  if (!node) {
    return (
      <div
        className="w-72 rounded-lg p-4 flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Select a node to configure
        </p>
      </div>
    );
  }

  const meta = NODE_META[node.type];

  return (
    <div
      className="w-72 rounded-lg p-4 flex flex-col gap-4"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{meta.icon}</span>
        <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>
          Configure Node
        </h3>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Label
        </span>
        <input
          type="text"
          value={node.label}
          onChange={(e) => onUpdate(node.id, { label: e.target.value })}
          className="px-3 py-1.5 rounded text-sm border"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
          }}
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Description
        </span>
        <textarea
          value={node.description}
          onChange={(e) => onUpdate(node.id, { description: e.target.value })}
          rows={3}
          className="px-3 py-1.5 rounded text-sm border resize-none"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
          }}
        />
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={node.humanInLoop ?? false}
          onChange={(e) => onUpdate(node.id, { humanInLoop: e.target.checked })}
          className="rounded"
        />
        <span className="text-sm" style={{ color: 'var(--color-text)' }}>
          Human-in-the-Loop
        </span>
      </label>

      <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
        <span className="font-medium">Type:</span>{' '}
        <span
          className="px-1.5 py-0.5 rounded"
          style={{ backgroundColor: meta.color, color: 'white' }}
        >
          {node.type}
        </span>
      </div>
    </div>
  );
}
