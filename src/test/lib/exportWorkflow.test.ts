import { describe, it, expect } from 'vitest';
import { exportAsJSON, exportAsYAML } from '@/lib/exportWorkflow';
import type { WorkflowNode } from '@/lib/nodeTypes';

const testNodes: WorkflowNode[] = [
  {
    id: 'test-1',
    type: 'trigger',
    label: 'Test Trigger',
    description: 'A test trigger node',
    config: { source: 'sqs' },
  },
  {
    id: 'test-2',
    type: 'reason',
    label: 'Test Reasoner',
    description: 'A test reasoner node',
    config: {},
  },
];

describe('exportWorkflow', () => {
  describe('exportAsJSON', () => {
    it('returns valid JSON', () => {
      const json = exportAsJSON('Test Workflow', testNodes);
      const parsed = JSON.parse(json);
      expect(parsed.name).toBe('Test Workflow');
      expect(parsed.nodes).toHaveLength(2);
    });

    it('includes exportedAt timestamp', () => {
      const json = exportAsJSON('Test', testNodes);
      const parsed = JSON.parse(json);
      expect(parsed.exportedAt).toBeTruthy();
    });

    it('preserves node data', () => {
      const json = exportAsJSON('Test', testNodes);
      const parsed = JSON.parse(json);
      expect(parsed.nodes[0].type).toBe('trigger');
      expect(parsed.nodes[1].type).toBe('reason');
    });
  });

  describe('exportAsYAML', () => {
    it('starts with name field', () => {
      const yaml = exportAsYAML('Test Workflow', testNodes);
      expect(yaml.startsWith('name: "Test Workflow"')).toBe(true);
    });

    it('includes nodes section', () => {
      const yaml = exportAsYAML('Test', testNodes);
      expect(yaml).toContain('nodes:');
      expect(yaml).toContain('type: "trigger"');
      expect(yaml).toContain('type: "reason"');
    });

    it('includes config entries', () => {
      const yaml = exportAsYAML('Test', testNodes);
      expect(yaml).toContain('source: "sqs"');
    });
  });
});
