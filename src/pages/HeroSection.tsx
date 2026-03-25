export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, var(--color-primary) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 text-center max-w-3xl">
        <div
          className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-6"
          style={{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-accent)',
            border: '1px solid var(--color-border)',
          }}
        >
          AI Workflow Automation for Media Operations
        </div>

        <h1 className="text-6xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
          Agent<span style={{ color: 'var(--color-primary)' }}>Flow</span>
        </h1>

        <p className="text-xl mb-4" style={{ color: 'var(--color-text-muted)' }}>
          Visual builder for composing, configuring, and simulating AI agent workflows on AWS. Built
          for media operations on the Helix platform.
        </p>

        <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
          Powered by AWS Bedrock (Claude) &middot; Step Functions &middot; Lambda &middot; DynamoDB
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="#builder"
            className="px-6 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Start Building
          </a>
          <a
            href="#use-cases"
            className="px-6 py-3 rounded-lg font-medium transition-opacity hover:opacity-80"
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
            }}
          >
            View Use Cases
          </a>
        </div>
      </div>
    </section>
  );
}
