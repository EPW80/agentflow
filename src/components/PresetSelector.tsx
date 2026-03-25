import { ALL_PRESETS } from '@/lib/presets';

interface PresetSelectorProps {
  onSelect: (preset: (typeof ALL_PRESETS)[number]) => void;
  activePreset: string | null;
}

export function PresetSelector({ onSelect, activePreset }: PresetSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      {ALL_PRESETS.map((preset) => (
        <button
          key={preset.name}
          onClick={() => onSelect(preset)}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all border"
          style={{
            backgroundColor:
              activePreset === preset.name ? 'var(--color-primary)' : 'var(--color-surface)',
            color: activePreset === preset.name ? 'white' : 'var(--color-text)',
            borderColor:
              activePreset === preset.name ? 'var(--color-primary)' : 'var(--color-border)',
          }}
        >
          {preset.name}
        </button>
      ))}
    </div>
  );
}
