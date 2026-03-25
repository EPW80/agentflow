import { Layout } from '@/components/Layout';
import { BuilderSection } from '@/components/BuilderSection';
import { HeroSection } from '@/pages/HeroSection';
import { UseCasesSection } from '@/pages/UseCasesSection';
import { ArchitectureSection } from '@/pages/ArchitectureSection';
import { StackSection } from '@/pages/StackSection';
import { useTheme } from '@/hooks/useTheme';

function App() {
  const { theme, toggle } = useTheme();

  return (
    <Layout theme={theme} onToggleTheme={toggle}>
      <HeroSection />
      <BuilderSection />
      <UseCasesSection />
      <ArchitectureSection />
      <StackSection />
    </Layout>
  );
}

export default App;
