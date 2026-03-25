import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'builder', label: 'Builder' },
  { id: 'use-cases', label: 'Use Cases' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'stack', label: 'Stack' },
];

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-3 flex items-center justify-between backdrop-blur-md"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <a href="#hero" className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>
        AgentFlow
      </a>
      <div className="flex items-center gap-6">
        {NAV_ITEMS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className="text-sm transition-colors"
            style={{
              color: activeSection === id ? 'var(--color-primary)' : 'var(--color-text-muted)',
            }}
          >
            {label}
          </a>
        ))}
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </nav>
  );
}
