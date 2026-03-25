interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="px-2 py-1 rounded-md text-sm transition-colors"
      style={{
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-text)',
        border: '1px solid var(--color-border)',
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
