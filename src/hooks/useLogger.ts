import { useState, useCallback } from 'react';

export interface LogEntry {
  id: number;
  timestamp: number;
  nodeId: string;
  message: string;
  level: 'info' | 'warn' | 'error';
}

let logId = 0;

export function useLogger() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const log = useCallback((nodeId: string, message: string, level: LogEntry['level'] = 'info') => {
    setLogs((prev) => [...prev, { id: ++logId, timestamp: Date.now(), nodeId, message, level }]);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return { logs, log, clearLogs };
}
