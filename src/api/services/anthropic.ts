import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

const SYSTEM_PROMPT = `You are an AI agent operating within the AgentFlow workflow automation platform,
designed for media operations on the Whip Media Helix platform.

Your role is to analyze inputs and provide structured reasoning for workflow decisions.
Focus on content distribution, licensing compliance, revenue analysis, and operational efficiency.

Always respond with clear, actionable insights relevant to media operations.`;

export async function reasonWithClaude(
  prompt: string,
  context: Record<string, unknown>,
): Promise<string> {
  const contextStr =
    Object.keys(context).length > 0 ? `\n\nContext: ${JSON.stringify(context)}` : '';

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `${prompt}${contextStr}`,
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === 'text');
  return textBlock?.text ?? 'No response generated.';
}
