const outputs: Record<string, Record<string, string>> = {
  'Ticket Triage Agent': {
    'tt-1': 'Received ticket #4821 from SQS queue: "Content not appearing in EU region"',
    'tt-2':
      'Classification: P1 — Revenue-impacting. Category: Distribution delay. Region: EU-West. Confidence: 92%',
    'tt-3': 'Routed to Distribution Ops team. Assigned to on-call engineer via PagerDuty.',
    'tt-4': 'Awaiting human review — P1 ticket requires manual verification before Jira update.',
    'tt-5':
      'Created JIRA-4821: "EU Distribution Delay — Content ID #TL-9920". Status: In Progress.',
  },
  'Content Distribution Workflow': {
    'cd-1': 'New title detected: "The Last Frontier" (ID: TL-10234). Genre: Drama. Origin: US.',
    'cd-2':
      'Market analysis: High demand in UK, DE, JP. Recommended windows: UK (Day+0), DE (Day+7), JP (Day+14). Revenue estimate: $2.4M.',
    'cd-3':
      'Distribution plan generated: 12 territories, 3 window tiers. Avails submitted to partner systems.',
    'cd-4': 'Notifications sent to 8 platform partners via SNS. Delivery confirmed.',
    'cd-5': 'Distribution plan logged. Helix dashboard updated with status: "Active Distribution".',
  },
  'Licensing Compliance Check': {
    'lc-1': 'Compliance audit triggered. Scanning 2,847 active titles across 45 territories.',
    'lc-2':
      'Rights data fetched: 14,235 active windows. 3 titles flagged with expiring rights (< 30 days).',
    'lc-3':
      'Violations detected: Title "Ocean Blue" available in FR but license expired 2 days ago. Title "Night Watch" — JP window starts next week but already listed.',
    'lc-4': 'Awaiting legal review — 2 potential violations require human verification.',
    'lc-5':
      'Violation report sent to #legal-compliance. Email notification to compliance@whipmedia.com.',
  },
  'Revenue Anomaly Detection': {
    'ra-1': 'Revenue update detected: Q4 streaming royalties — $847K (down 34% from forecast).',
    'ra-2':
      'Anomaly detected: Revenue drop correlates with missing avails in APAC region. Pattern suggests data ingestion failure, not market decline. Confidence: 87%.',
    'ra-3': 'Awaiting finance analyst verification — anomaly flagged for human review.',
    'ra-4':
      'Alert sent to finance team via SNS. Includes anomaly summary and recommended investigation steps.',
    'ra-5':
      'Revenue monitoring dashboard updated. Anomaly status: "Under Investigation". Alert ID: RA-2024-0847.',
  },
};

export function getSimulationOutput(presetName: string, nodeId: string): string {
  return (
    outputs[presetName]?.[nodeId] ?? `Processing complete. Node ${nodeId} executed successfully.`
  );
}
