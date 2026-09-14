import { anthropic } from "@ai-sdk/anthropic"
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai"
import { buildOrchestratorPrompt } from "@/lib/prompt"
import { listSkills } from "@/lib/skills"
import { tools } from "@/lib/tools"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: anthropic("claude-sonnet-5"),
    instructions: buildOrchestratorPrompt(listSkills()),
    messages: await convertToModelMessages(messages),
    tools,
    stopWhen: stepCountIs(8),
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream, tools }),
  })
}
