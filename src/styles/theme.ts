export const themeTokens = {
  colors: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    accent: 'var(--color-accent)',
    bg: 'var(--color-bg)',
    surface: 'var(--color-surface)',
    text: 'var(--color-text)',
    textMuted: 'var(--color-text-muted)',
    border: 'var(--color-border)',
  },
  nodeColors: {
    trigger: 'var(--color-node-trigger)',
    reason: 'var(--color-node-reason)',
    action: 'var(--color-node-action)',
    review: 'var(--color-node-review)',
    handoff: 'var(--color-node-handoff)',
  },
} as const;
