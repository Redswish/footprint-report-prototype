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

  const modelMessages = await convertToModelMessages(messages)

  // Cache everything up to the newest user turn so the growing conversation
  // history (loaded skills, prior answers) is reused instead of rebilled
  // on every request. Anthropic caches the full prefix up to a breakpoint,
  // so this one breakpoint also covers the tools/system prefix below.
  const cacheBoundary = modelMessages.length - 2
  if (cacheBoundary >= 0) {
    const message = modelMessages[cacheBoundary]
    modelMessages[cacheBoundary] = {
      ...message,
      providerOptions: {
        ...message.providerOptions,
        anthropic: { cacheControl: { type: "ephemeral" } },
      },
    }
  }

  const result = streamText({
    model: anthropic("claude-haiku-4-5"),
    instructions: {
      role: "system",
      content: buildOrchestratorPrompt(listSkills()),
      providerOptions: { anthropic: { cacheControl: { type: "ephemeral" } } },
    },
    messages: modelMessages,
    tools,
    stopWhen: stepCountIs(8),
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream, tools }),
  })
}
