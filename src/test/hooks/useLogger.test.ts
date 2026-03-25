import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLogger } from '@/hooks/useLogger';

describe('useLogger', () => {
  it('starts with empty logs', () => {
    const { result } = renderHook(() => useLogger());
    expect(result.current.logs).toEqual([]);
  });

  it('adds a log entry', () => {
    const { result } = renderHook(() => useLogger());
    act(() => {
      result.current.log('node-1', 'Test message');
    });
    expect(result.current.logs).toHaveLength(1);
    expect(result.current.logs[0].nodeId).toBe('node-1');
    expect(result.current.logs[0].message).toBe('Test message');
    expect(result.current.logs[0].level).toBe('info');
  });

  it('supports different log levels', () => {
    const { result } = renderHook(() => useLogger());
    act(() => {
      result.current.log('node-1', 'Warning', 'warn');
      result.current.log('node-2', 'Error', 'error');
    });
    expect(result.current.logs[0].level).toBe('warn');
    expect(result.current.logs[1].level).toBe('error');
  });

  it('clears logs', () => {
    const { result } = renderHook(() => useLogger());
    act(() => {
      result.current.log('node-1', 'Test');
      result.current.log('node-2', 'Test');
    });
    expect(result.current.logs).toHaveLength(2);
    act(() => {
      result.current.clearLogs();
    });
    expect(result.current.logs).toEqual([]);
  });
});
