const STACK_CATEGORIES = [
  {
    category: 'Frontend',
    items: [
      { name: 'React 18', role: 'UI framework with TypeScript' },
      { name: 'Tailwind CSS', role: 'Utility-first styling' },
      { name: 'Vite', role: 'Build tool and dev server' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js + Express', role: 'API server and routing' },
      { name: 'Python + FastAPI', role: 'Agent runner bridge' },
    ],
  },
  {
    category: 'AI / ML',
    items: [
      { name: 'AWS Bedrock', role: 'Managed LLM inference (Claude)' },
      { name: 'AWS Agent Core', role: 'Agent runtime and orchestration' },
    ],
  },
  {
    category: 'Infrastructure',
    items: [
      { name: 'AWS Lambda', role: 'Serverless compute' },
      { name: 'Step Functions', role: 'Workflow orchestration' },
      { name: 'DynamoDB', role: 'State and data persistence' },
      { name: 'SQS / SNS', role: 'Event messaging and notifications' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Vitest', role: 'Unit and integration testing' },
      { name: 'ESLint + Prettier', role: 'Code quality and formatting' },
      { name: 'GitHub Actions', role: 'CI/CD pipeline' },
    ],
  },
];

export function StackSection() {
  return (
    <section id="stack" className="min-h-screen px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3" style={{ color: 'var(--color-text)' }}>
          Technology Stack
        </h2>
        <p
          className="text-center mb-12 max-w-2xl mx-auto"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Modern, production-ready stack chosen for scalability, developer experience, and alignment
          with Whip Media&apos;s infrastructure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STACK_CATEGORIES.map((cat) => (
            <div
              key={cat.category}
              className="rounded-xl p-5"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--color-accent)' }}
              >
                {cat.category}
              </h3>
              <div className="flex flex-col gap-3">
                {cat.items.map((item) => (
                  <div key={item.name}>
                    <div className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                      {item.name}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {item.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
