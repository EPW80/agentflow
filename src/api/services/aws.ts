/**
 * AWS service stubs for demo mode.
 * Replace with real AWS SDK calls for production.
 */

export async function invokeLambda(functionName: string, payload: unknown): Promise<unknown> {
  console.log(`[AWS Stub] Lambda invoke: ${functionName}`, payload);
  return {
    statusCode: 200,
    body: { message: `Lambda ${functionName} executed successfully`, payload },
  };
}

export async function queryDynamoDB(
  tableName: string,
  key: Record<string, unknown>,
): Promise<unknown> {
  console.log(`[AWS Stub] DynamoDB query: ${tableName}`, key);
  return {
    Items: [{ id: 'stub-001', ...key, status: 'active' }],
    Count: 1,
  };
}

export async function publishToSNS(topicArn: string, message: string): Promise<unknown> {
  console.log(`[AWS Stub] SNS publish: ${topicArn}`, message);
  return {
    MessageId: `stub-msg-${Date.now()}`,
    status: 'sent',
  };
}
