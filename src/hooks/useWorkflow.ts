import { useState, useCallback } from 'react';
import { WorkflowNode, NodeType, Workflow } from '@/lib/nodeTypes';
import { NODE_META } from '@/lib/nodeConfig';

let nextId = 1;
function generateId(): string {
  return `node-${nextId++}`;
}

function createNode(type: NodeType): WorkflowNode {
  const meta = NODE_META[type];
  return {
    id: generateId(),
    type,
    label: meta.defaultLabel,
    description: meta.defaultDescription,
    config: {},
    humanInLoop: type === 'review',
  };
}

export function useWorkflow() {
  const [currentNodes, setCurrentNodes] = useState<WorkflowNode[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const addNode = useCallback((type: NodeType, afterIndex?: number) => {
    const node = createNode(type);
    setCurrentNodes((prev) => {
      if (afterIndex !== undefined && afterIndex >= 0 && afterIndex < prev.length) {
        const next = [...prev];
        next.splice(afterIndex + 1, 0, node);
        return next;
      }
      return [...prev, node];
    });
    return node;
  }, []);

  const removeNode = useCallback((id: string) => {
    setCurrentNodes((prev) => prev.filter((n) => n.id !== id));
    setSelectedNodeId((prev) => (prev === id ? null : prev));
  }, []);

  const moveNode = useCallback((fromIndex: number, toIndex: number) => {
    setCurrentNodes((prev) => {
      if (
        fromIndex < 0 ||
        fromIndex >= prev.length ||
        toIndex < 0 ||
        toIndex >= prev.length ||
        fromIndex === toIndex
      ) {
        return prev;
      }
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const updateNode = useCallback((id: string, updates: Partial<WorkflowNode>) => {
    setCurrentNodes((prev) => prev.map((n) => (n.id === id ? { ...n, ...updates, id: n.id } : n)));
  }, []);

  const selectNode = useCallback((id: string | null) => {
    setSelectedNodeId(id);
  }, []);

  const clearWorkflow = useCallback(() => {
    setCurrentNodes([]);
    setSelectedNodeId(null);
  }, []);

  const loadPreset = useCallback((preset: Pick<Workflow, 'nodes'>) => {
    setCurrentNodes(preset.nodes);
    setSelectedNodeId(null);
  }, []);

  const selectedNode = currentNodes.find((n) => n.id === selectedNodeId) ?? null;

  return {
    currentNodes,
    selectedNode,
    selectedNodeId,
    addNode,
    removeNode,
    moveNode,
    updateNode,
    selectNode,
    clearWorkflow,
    loadPreset,
  };
}
