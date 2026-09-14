"use client"

import { useMemo } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls } from "ai"
import { LeafIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ChatPanel } from "@/components/chat/chat-panel"
import { ReportPanel } from "@/components/report/report-panel"
import type { AppUIMessage } from "@/lib/chat-types"
import type { ShowReportInput } from "@/lib/report-types"

export default function Page() {
  const { messages, sendMessage, status, addToolOutput } = useChat<AppUIMessage>({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
  })

  const report = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const parts = messages[i].parts
      for (let j = parts.length - 1; j >= 0; j--) {
        const part = parts[j]
        if (
          part.type === "tool-showReport" &&
          (part.state === "input-available" || part.state === "output-available")
        ) {
          return part.input as ShowReportInput
        }
      }
    }
    return null
  }, [messages])

  const started = messages.length > 0

  return (
    <div className="grid h-svh grid-cols-1 grid-rows-2 lg:grid-cols-[1fr_420px] lg:grid-rows-1">
      <div className="flex min-h-0 flex-col">
        {started ? (
          <ChatPanel
            messages={messages}
            status={status}
            sendMessage={sendMessage}
            addToolOutput={addToolOutput}
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6">
            <Empty className="max-w-md border-none">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <LeafIcon />
                </EmptyMedia>
                <EmptyTitle>What&apos;s your footprint, actually?</EmptyTitle>
                <EmptyDescription>
                  A short conversation about how you actually live — not a form.
                  A few minutes, and it&apos;ll tell you what&apos;s really
                  worth changing.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  onClick={() =>
                    sendMessage({ text: "I'd like to work out my carbon footprint." })
                  }
                >
                  Calculate my footprint
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        )}
      </div>

      <div className="flex min-h-0 flex-col border-t border-border lg:border-t-0 lg:border-l">
        {report ? (
          <ReportPanel report={report} />
        ) : (
          <div className="flex h-full items-center justify-center p-6">
            <Empty className="border-none">
              <EmptyHeader>
                <EmptyTitle>Your report lands here</EmptyTitle>
                <EmptyDescription>
                  It stays on screen once it&apos;s ready, even as the
                  conversation keeps going.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        )}
      </div>
    </div>
  )
}
