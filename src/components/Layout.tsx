import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Layout({ children, theme, onToggleTheme }: LayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
      <main className="pt-14">{children}</main>
    </div>
  );
}
