import { NodeType } from '@/lib/nodeTypes';
import { NODE_META, NODE_TYPES } from '@/lib/nodeConfig';

interface SidebarProps {
  onAddNode: (type: NodeType) => void;
  onClear: () => void;
  nodeCount: number;
}

export function Sidebar({ onAddNode, onClear, nodeCount }: SidebarProps) {
  return (
    <div
      className="w-64 rounded-lg p-4 flex flex-col gap-3"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <h3
        className="text-sm font-semibold uppercase tracking-wider"
        style={{ color: 'var(--color-text-muted)' }}
      >
        Node Palette
      </h3>
      <div className="flex flex-col gap-2">
        {NODE_TYPES.map((type) => {
          const meta = NODE_META[type];
          return (
            <button
              key={type}
              onClick={() => onAddNode(type)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left transition-colors hover:brightness-125"
              style={{
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
                borderLeft: `3px solid ${meta.color}`,
              }}
            >
              <span>{meta.icon}</span>
              <span>{meta.defaultLabel}</span>
            </button>
          );
        })}
      </div>
      {nodeCount > 0 && (
        <button
          onClick={onClear}
          className="mt-auto text-xs px-3 py-2 rounded-md transition-colors hover:brightness-125"
          style={{
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text-muted)',
          }}
        >
          Clear Workflow ({nodeCount} nodes)
        </button>
      )}
    </div>
  );
}
