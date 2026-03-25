import { describe, it, expect } from 'vitest';
import { NODE_META, NODE_TYPES } from '@/lib/nodeConfig';
import type { NodeType } from '@/lib/nodeTypes';

describe('nodeConfig', () => {
  const expectedTypes: NodeType[] = ['trigger', 'reason', 'action', 'review', 'handoff'];

  it('defines all 5 node types', () => {
    expect(NODE_TYPES).toEqual(expectedTypes);
  });

  it('has metadata for every node type', () => {
    expectedTypes.forEach((type) => {
      const meta = NODE_META[type];
      expect(meta).toBeDefined();
      expect(meta.icon).toBeTruthy();
      expect(meta.color).toMatch(/^var\(--color-node-/);
      expect(meta.defaultLabel).toBeTruthy();
      expect(meta.defaultDescription).toBeTruthy();
      expect(Array.isArray(meta.allowedNext)).toBe(true);
    });
  });

  it('handoff has no allowed next nodes', () => {
    expect(NODE_META.handoff.allowedNext).toEqual([]);
  });

  it('trigger can only go to reason or action', () => {
    expect(NODE_META.trigger.allowedNext).toEqual(['reason', 'action']);
  });
});
