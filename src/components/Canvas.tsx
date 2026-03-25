import { useState } from 'react';
import { WorkflowNode, ExecutionStep } from '@/lib/nodeTypes';
import { NodeCard } from './NodeCard';

interface CanvasProps {
  nodes: WorkflowNode[];
  selectedNodeId: string | null;
  executionSteps: ExecutionStep[];
  onSelectNode: (id: string) => void;
  onRemoveNode: (id: string) => void;
  onMoveNode: (fromIndex: number, toIndex: number) => void;
  onApprove?: (nodeId: string) => void;
  onReject?: (nodeId: string) => void;
}

export function Canvas({
  nodes,
  selectedNodeId,
  executionSteps,
  onSelectNode,
  onRemoveNode,
  onMoveNode,
  onApprove,
  onReject,
}: CanvasProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDropTargetIndex(index);
  };

  const handleDrop = (toIndex: number) => {
    if (dragIndex !== null && dragIndex !== toIndex) {
      onMoveNode(dragIndex, toIndex);
    }
    setDragIndex(null);
    setDropTargetIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDropTargetIndex(null);
  };

  if (nodes.length === 0) {
    return (
      <div
        className="flex-1 flex items-center justify-center rounded-lg border-2 border-dashed"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <p className="text-center" style={{ color: 'var(--color-text-muted)' }}>
          Add nodes from the sidebar or load a preset to get started
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-2 py-4" onDragEnd={handleDragEnd}>
      {nodes.map((node, index) => {
        const step = executionSteps.find((s) => s.nodeId === node.id);
        return (
          <div key={node.id}>
            {dropTargetIndex === index && dragIndex !== null && dragIndex !== index && (
              <div
                className="h-1 rounded-full mx-4 mb-2"
                style={{ backgroundColor: 'var(--color-primary)' }}
              />
            )}
            <NodeCard
              node={node}
              index={index}
              isSelected={selectedNodeId === node.id}
              executionStep={step}
              onSelect={onSelectNode}
              onRemove={onRemoveNode}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onApprove={onApprove}
              onReject={onReject}
            />
            {index < nodes.length - 1 && (
              <div className="flex justify-center py-1">
                <div className="w-0.5 h-6" style={{ backgroundColor: 'var(--color-border)' }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
