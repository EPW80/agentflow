import { useState } from 'react';
import { useWorkflow } from '@/hooks/useWorkflow';
import { useAgentExec } from '@/hooks/useAgentExec';
import { Canvas } from './Canvas';
import { Sidebar } from './Sidebar';
import { Panel } from './Panel';
import { PresetSelector } from './PresetSelector';
import { ExportButton } from './ExportButton';
import { ALL_PRESETS } from '@/lib/presets';

export function BuilderSection() {
  const {
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
  } = useWorkflow();

  const { executionSteps, isRunning, runSimulation, approveStep, rejectStep, resetSimulation } =
    useAgentExec();

  const [activePreset, setActivePreset] = useState<string | null>(null);

  const handlePresetSelect = (preset: (typeof ALL_PRESETS)[number]) => {
    loadPreset(preset);
    setActivePreset(preset.name);
    resetSimulation();
  };

  const handleRun = () => {
    if (currentNodes.length > 0) {
      runSimulation(currentNodes, activePreset ?? 'Custom');
    }
  };

  const handleClear = () => {
    clearWorkflow();
    resetSimulation();
    setActivePreset(null);
  };

  return (
    <section id="builder" className="min-h-screen px-6 py-12">
      <h2 className="text-2xl font-bold text-center mb-4" style={{ color: 'var(--color-text)' }}>
        Workflow Builder
      </h2>
      <p className="text-center mb-6 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        Load a preset or build your own workflow, then run the simulation
      </p>

      <PresetSelector onSelect={handlePresetSelect} activePreset={activePreset} />

      <div className="max-w-6xl mx-auto flex justify-center gap-3 mb-6">
        <button
          onClick={handleRun}
          disabled={isRunning || currentNodes.length === 0}
          className="px-5 py-2 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-40"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          {isRunning ? 'Running...' : 'Run Simulation'}
        </button>
        {executionSteps.length > 0 && !isRunning && (
          <button
            onClick={resetSimulation}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-opacity"
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
            }}
          >
            Reset
          </button>
        )}
        <ExportButton nodes={currentNodes} workflowName={activePreset ?? 'custom-workflow'} />
      </div>

      <div className="max-w-6xl mx-auto flex gap-4">
        <Sidebar
          onAddNode={(type) => addNode(type)}
          onClear={handleClear}
          nodeCount={currentNodes.length}
        />
        <Canvas
          nodes={currentNodes}
          selectedNodeId={selectedNodeId}
          executionSteps={executionSteps}
          onSelectNode={selectNode}
          onRemoveNode={removeNode}
          onMoveNode={moveNode}
          onApprove={approveStep}
          onReject={rejectStep}
        />
        <Panel node={selectedNode} onUpdate={updateNode} />
      </div>
    </section>
  );
}
