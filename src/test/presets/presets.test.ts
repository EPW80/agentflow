import { describe, it, expect } from 'vitest';
import { ALL_PRESETS } from '@/lib/presets';
import { NODE_TYPES } from '@/lib/nodeConfig';
import type { NodeType } from '@/lib/nodeTypes';

describe('Workflow Presets', () => {
  it('exports 4 presets', () => {
    expect(ALL_PRESETS).toHaveLength(4);
  });

  ALL_PRESETS.forEach((preset) => {
    describe(preset.name, () => {
      it('has a name and description', () => {
        expect(preset.name).toBeTruthy();
        expect(preset.description).toBeTruthy();
      });

      it('has at least 3 nodes', () => {
        expect(preset.nodes.length).toBeGreaterThanOrEqual(3);
      });

      it('all nodes have valid types', () => {
        preset.nodes.forEach((node) => {
          expect(NODE_TYPES).toContain(node.type as NodeType);
        });
      });

      it('all nodes have unique ids', () => {
        const ids = preset.nodes.map((n) => n.id);
        expect(new Set(ids).size).toBe(ids.length);
      });

      it('starts with a trigger node', () => {
        expect(preset.nodes[0].type).toBe('trigger');
      });

      it('ends with a handoff node', () => {
        expect(preset.nodes[preset.nodes.length - 1].type).toBe('handoff');
      });

      it('all nodes have labels and descriptions', () => {
        preset.nodes.forEach((node) => {
          expect(node.label).toBeTruthy();
          expect(node.description).toBeTruthy();
        });
      });
    });
  });
});
