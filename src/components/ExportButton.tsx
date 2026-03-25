import { useState } from 'react';
import { WorkflowNode } from '@/lib/nodeTypes';
import { exportAsJSON, exportAsYAML, downloadFile } from '@/lib/exportWorkflow';

interface ExportButtonProps {
  nodes: WorkflowNode[];
  workflowName: string;
}

export function ExportButton({ nodes, workflowName }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (nodes.length === 0) return null;

  const handleExport = (format: 'json' | 'yaml') => {
    const name = workflowName || 'custom-workflow';
    const safeName = name.toLowerCase().replace(/\s+/g, '-');

    if (format === 'json') {
      downloadFile(exportAsJSON(name, nodes), `${safeName}.json`, 'application/json');
    } else {
      downloadFile(exportAsYAML(name, nodes), `${safeName}.yaml`, 'text/yaml');
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity"
        style={{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)',
        }}
      >
        Export
      </button>
      {isOpen && (
        <div
          className="absolute top-full mt-1 right-0 rounded-lg shadow-lg overflow-hidden z-10"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <button
            onClick={() => handleExport('json')}
            className="block w-full text-left px-4 py-2 text-sm hover:brightness-125"
            style={{ color: 'var(--color-text)' }}
          >
            Export as JSON
          </button>
          <button
            onClick={() => handleExport('yaml')}
            className="block w-full text-left px-4 py-2 text-sm hover:brightness-125"
            style={{ color: 'var(--color-text)' }}
          >
            Export as YAML
          </button>
        </div>
      )}
    </div>
  );
}
