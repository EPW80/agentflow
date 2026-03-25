import { ALL_PRESETS } from '@/lib/presets';

const USE_CASE_ICONS: Record<string, string> = {
  'Ticket Triage Agent': '🎫',
  'Content Distribution Workflow': '📡',
  'Licensing Compliance Check': '📜',
  'Revenue Anomaly Detection': '📊',
};

interface UseCasesSectionProps {
  onTryPreset?: (preset: (typeof ALL_PRESETS)[number]) => void;
}

export function UseCasesSection({ onTryPreset }: UseCasesSectionProps) {
  return (
    <section id="use-cases" className="min-h-screen px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3" style={{ color: 'var(--color-text)' }}>
          Media Operations Use Cases
        </h2>
        <p
          className="text-center mb-12 max-w-2xl mx-auto"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Real-world workflows designed for content distribution, licensing, and revenue operations
          on the Helix platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ALL_PRESETS.map((preset) => (
            <div
              key={preset.name}
              className="rounded-xl p-6 transition-transform hover:scale-[1.02]"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="text-3xl mb-3">{USE_CASE_ICONS[preset.name] ?? '⚡'}</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                {preset.name}
              </h3>
              <p
                className="text-sm mb-4 leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {preset.description}
              </p>
              <div className="flex items-center gap-2 mb-4">
                {preset.nodes.map((node) => (
                  <span
                    key={node.id}
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: 'var(--color-bg)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {node.type}
                  </span>
                ))}
              </div>
              {onTryPreset && (
                <button
                  onClick={() => onTryPreset(preset)}
                  className="text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Try it in Builder →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
