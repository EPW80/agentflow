import { Workflow, WorkflowNode } from './nodeTypes';

export function exportAsJSON(name: string, nodes: WorkflowNode[]): string {
  const workflow: Omit<Workflow, 'id' | 'createdAt'> & { exportedAt: string } = {
    name,
    description: `Exported workflow: ${name}`,
    nodes,
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(workflow, null, 2);
}

export function exportAsYAML(name: string, nodes: WorkflowNode[]): string {
  const lines: string[] = [];
  lines.push(`name: "${name}"`);
  lines.push(`description: "Exported workflow: ${name}"`);
  lines.push(`exportedAt: "${new Date().toISOString()}"`);
  lines.push('nodes:');

  for (const node of nodes) {
    lines.push(`  - id: "${node.id}"`);
    lines.push(`    type: "${node.type}"`);
    lines.push(`    label: "${node.label}"`);
    lines.push(`    description: "${node.description}"`);
    if (node.humanInLoop) {
      lines.push(`    humanInLoop: true`);
    }
    if (Object.keys(node.config).length > 0) {
      lines.push(`    config:`);
      for (const [key, value] of Object.entries(node.config)) {
        lines.push(`      ${key}: "${value}"`);
      }
    }
  }

  return lines.join('\n') + '\n';
}

export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
