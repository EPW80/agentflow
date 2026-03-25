import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWorkflow } from '@/hooks/useWorkflow';

describe('useWorkflow', () => {
  it('starts with empty nodes', () => {
    const { result } = renderHook(() => useWorkflow());
    expect(result.current.currentNodes).toEqual([]);
    expect(result.current.selectedNode).toBeNull();
  });

  it('adds a node', () => {
    const { result } = renderHook(() => useWorkflow());
    act(() => {
      result.current.addNode('trigger');
    });
    expect(result.current.currentNodes).toHaveLength(1);
    expect(result.current.currentNodes[0].type).toBe('trigger');
  });

  it('adds a node after a specific index', () => {
    const { result } = renderHook(() => useWorkflow());
    act(() => {
      result.current.addNode('trigger');
      result.current.addNode('handoff');
      result.current.addNode('reason', 0);
    });
    expect(result.current.currentNodes).toHaveLength(3);
    expect(result.current.currentNodes[1].type).toBe('reason');
  });

  it('removes a node', () => {
    const { result } = renderHook(() => useWorkflow());
    act(() => {
      result.current.addNode('trigger');
    });
    const id = result.current.currentNodes[0].id;
    act(() => {
      result.current.removeNode(id);
    });
    expect(result.current.currentNodes).toHaveLength(0);
  });

  it('moves a node', () => {
    const { result } = renderHook(() => useWorkflow());
    act(() => {
      result.current.addNode('trigger');
      result.current.addNode('reason');
      result.current.addNode('action');
    });
    act(() => {
      result.current.moveNode(2, 0);
    });
    expect(result.current.currentNodes[0].type).toBe('action');
    expect(result.current.currentNodes[1].type).toBe('trigger');
    expect(result.current.currentNodes[2].type).toBe('reason');
  });

  it('updates a node', () => {
    const { result } = renderHook(() => useWorkflow());
    act(() => {
      result.current.addNode('trigger');
    });
    const id = result.current.currentNodes[0].id;
    act(() => {
      result.current.updateNode(id, { label: 'Custom Label' });
    });
    expect(result.current.currentNodes[0].label).toBe('Custom Label');
  });

  it('selects a node', () => {
    const { result } = renderHook(() => useWorkflow());
    act(() => {
      result.current.addNode('trigger');
    });
    const id = result.current.currentNodes[0].id;
    act(() => {
      result.current.selectNode(id);
    });
    expect(result.current.selectedNode?.id).toBe(id);
  });

  it('clears the workflow', () => {
    const { result } = renderHook(() => useWorkflow());
    act(() => {
      result.current.addNode('trigger');
      result.current.addNode('reason');
    });
    act(() => {
      result.current.clearWorkflow();
    });
    expect(result.current.currentNodes).toHaveLength(0);
    expect(result.current.selectedNode).toBeNull();
  });

  it('loads a preset', () => {
    const { result } = renderHook(() => useWorkflow());
    const preset = {
      nodes: [
        {
          id: 'preset-1',
          type: 'trigger' as const,
          label: 'Test',
          description: 'Test node',
          config: {},
        },
      ],
    };
    act(() => {
      result.current.loadPreset(preset);
    });
    expect(result.current.currentNodes).toHaveLength(1);
    expect(result.current.currentNodes[0].id).toBe('preset-1');
  });
});
