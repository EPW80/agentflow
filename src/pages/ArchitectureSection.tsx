const LAYERS = [
  {
    name: 'Event Sources',
    color: 'var(--color-node-trigger)',
    services: ['SQS / SNS', 'DynamoDB Streams', 'EventBridge', 'API Gateway'],
    description: 'External events that trigger agent workflows',
  },
  {
    name: 'Orchestration',
    color: 'var(--color-node-reason)',
    services: ['Step Functions', 'AWS Agent Core', 'Bedrock (Claude)', 'Lambda'],
    description: 'AI reasoning, decision-making, and workflow coordination',
  },
  {
    name: 'Action',
    color: 'var(--color-node-action)',
    services: ['Lambda Functions', 'DynamoDB', 'S3', 'External APIs'],
    description: 'Execute operations and persist state changes',
  },
  {
    name: 'Output / Feedback',
    color: 'var(--color-node-handoff)',
    services: ['SNS Notifications', 'Helix Dashboard', 'Jira / Slack', 'CloudWatch'],
    description: 'Deliver results and capture metrics for continuous improvement',
  },
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="min-h-screen px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3" style={{ color: 'var(--color-text)' }}>
          Architecture
        </h2>
        <p
          className="text-center mb-12 max-w-2xl mx-auto"
          style={{ color: 'var(--color-text-muted)' }}
        >
          4-layer architecture built on AWS services. Event-driven, serverless, and designed for
          media operations at scale.
        </p>

        <div className="flex flex-col gap-4">
          {LAYERS.map((layer, index) => (
            <div key={layer.name}>
              <div
                className="rounded-xl p-6 transition-transform hover:scale-[1.01]"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderLeft: `4px solid ${layer.color}`,
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1" style={{ color: layer.color }}>
                      {layer.name}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {layer.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {layer.services.map((service) => (
                      <span
                        key={service}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: 'var(--color-bg)',
                          color: 'var(--color-text)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {index < LAYERS.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="text-lg" style={{ color: 'var(--color-text-muted)' }}>
                    ↓
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
