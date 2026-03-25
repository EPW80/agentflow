import { useState, useCallback, useRef } from 'react';
import { WorkflowNode, ExecutionStep } from '@/lib/nodeTypes';
import { getSimulationOutput } from '@/lib/mocks/simulationOutputs';

const STEP_DELAY = 1500;

export function useAgentExec() {
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const resolveHumanRef = useRef<(() => void) | null>(null);

  const runSimulation = useCallback(
    async (nodes: WorkflowNode[], presetName: string) => {
      if (isRunning) return;
      setIsRunning(true);

      const initialSteps: ExecutionStep[] = nodes.map((n) => ({
        nodeId: n.id,
        status: 'pending',
      }));
      setExecutionSteps(initialSteps);

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        setExecutionSteps((prev) =>
          prev.map((s) =>
            s.nodeId === node.id ? { ...s, status: 'running', startedAt: Date.now() } : s,
          ),
        );

        await new Promise((resolve) => setTimeout(resolve, STEP_DELAY));

        if (node.humanInLoop) {
          setExecutionSteps((prev) =>
            prev.map((s) => (s.nodeId === node.id ? { ...s, status: 'waiting-human' } : s)),
          );

          await new Promise<void>((resolve) => {
            resolveHumanRef.current = resolve;
          });
        }

        const output = getSimulationOutput(presetName, node.id);
        setExecutionSteps((prev) =>
          prev.map((s) =>
            s.nodeId === node.id
              ? { ...s, status: 'complete', output, completedAt: Date.now() }
              : s,
          ),
        );
      }

      setIsRunning(false);
    },
    [isRunning],
  );

  const approveStep = useCallback(() => {
    if (resolveHumanRef.current) {
      resolveHumanRef.current();
      resolveHumanRef.current = null;
    }
  }, []);

  const rejectStep = useCallback((nodeId: string) => {
    setExecutionSteps((prev) =>
      prev.map((s) =>
        s.nodeId === nodeId ? { ...s, status: 'error', output: 'Rejected by human reviewer.' } : s,
      ),
    );
    resolveHumanRef.current = null;
    setIsRunning(false);
  }, []);

  const resetSimulation = useCallback(() => {
    setExecutionSteps([]);
    setIsRunning(false);
    resolveHumanRef.current = null;
  }, []);

  return {
    executionSteps,
    isRunning,
    runSimulation,
    approveStep,
    rejectStep,
    resetSimulation,
  };
}
