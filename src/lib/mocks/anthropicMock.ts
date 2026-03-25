const MOCK_RESPONSES: Record<string, string> = {
  'ticket-triage':
    'Classification: P1 — Revenue-impacting. Category: Content delivery failure. Recommended action: Route to Distribution Ops with priority escalation. Confidence: 94%.',
  'content-distribution':
    'Market analysis complete. Title shows strong demand in UK (score: 0.89), DE (score: 0.82), JP (score: 0.76). Recommended distribution: UK Day+0, DE Day+7, JP Day+14. Estimated revenue impact: $2.4M.',
  'licensing-check':
    'Compliance scan complete. 2 violations detected: (1) Title "Ocean Blue" — FR license expired 2 days ago, content still live. (2) Title "Night Watch" — JP window starts in 7 days but already listed. Recommend immediate takedown for #1, delist for #2.',
  'revenue-anomaly':
    'Anomaly detected: Q4 APAC streaming royalties down 34% from forecast. Root cause analysis: Missing avails data from 3 partners (IDs: P-2201, P-2207, P-2215). Pattern consistent with data ingestion failure, not market decline. Confidence: 87%.',
  default:
    'Analysis complete. The input has been processed and the workflow can continue to the next step.',
};

export function getMockReasonerResponse(workflowType?: string): string {
  return MOCK_RESPONSES[workflowType ?? 'default'] ?? MOCK_RESPONSES.default;
}
