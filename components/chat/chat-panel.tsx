"use client"

import { useState } from "react"
import type { ChatAddToolOutputFunction } from "ai"
import { ArrowUpIcon } from "lucide-react"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { Message, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { Spinner } from "@/components/ui/spinner"
import { SliderAnswer, SliderQuestion } from "@/components/chat/widgets/slider-question"
import { TilesAnswer, TilesQuestion } from "@/components/chat/widgets/tiles-question"
import { MythCard } from "@/components/chat/widgets/myth-card"
import type { AppUIMessage } from "@/lib/chat-types"
import type {
  AskSliderInput,
  AskTilesInput,
  ShowMythCardInput,
} from "@/lib/report-types"

type ChatStatus = "submitted" | "streaming" | "ready" | "error"

// A pending askSlider/askTiles call means a widget is on screen waiting for the
// user's answer. Sending a plain-text message before it resolves leaves that tool
// call without a result, which the model can't recover from (AI_MissingToolResultsError)
// — so the input has to stay disabled until the widget is answered.
function hasPendingWidget(messages: AppUIMessage[]): boolean {
  for (let i = messages.length - 1; i >= 0; i--) {
    for (const part of messages[i].parts) {
      if (
        (part.type === "tool-askSlider" || part.type === "tool-askTiles") &&
        part.state === "input-available"
      ) {
        return true
      }
    }
  }
  return false
}

export function ChatPanel({
  messages,
  status,
  sendMessage,
  addToolOutput,
}: {
  messages: AppUIMessage[]
  status: ChatStatus
  sendMessage: (message: { text: string }) => void
  addToolOutput: ChatAddToolOutputFunction<AppUIMessage>
}) {
  const [input, setInput] = useState("")
  const pendingWidget = hasPendingWidget(messages)
  const isBusy = status === "submitted" || status === "streaming" || pendingWidget

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    const text = input.trim()
    if (!text || isBusy) return
    sendMessage({ text })
    setInput("")
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <MessageScrollerProvider>
        <MessageScroller className="flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent className="mx-auto w-full max-w-2xl p-4">
              {messages.map((message) => (
                <MessageScrollerItem
                  key={message.id}
                  scrollAnchor={message.role === "user"}
                >
                  <Message align={message.role === "user" ? "end" : "start"}>
                    <MessageContent>
                      {message.parts.map((part, index) => (
                        <MessagePart
                          key={`${message.id}-${index}`}
                          part={part}
                          role={message.role}
                          addToolOutput={addToolOutput}
                        />
                      ))}
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
              {isBusy ? (
                <MessageScrollerItem scrollAnchor={false}>
                  <Marker>
                    <MarkerIcon>
                      <Spinner />
                    </MarkerIcon>
                    <MarkerContent>Thinking…</MarkerContent>
                  </Marker>
                </MessageScrollerItem>
              ) : null}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>

      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-2xl shrink-0 p-4 pt-0"
      >
        <InputGroup>
          <InputGroupTextarea
            placeholder={
              pendingWidget
                ? "Answer above to continue…"
                : "Say anything — I'll steer us back on track."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
            disabled={pendingWidget}
            className="min-h-16"
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              type="submit"
              variant="default"
              size="icon-sm"
              className="ml-auto"
              disabled={!input.trim() || isBusy}
            >
              <ArrowUpIcon />
              <span className="sr-only">Send</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  )
}

function MessagePart({
  part,
  role,
  addToolOutput,
}: {
  part: AppUIMessage["parts"][number]
  role: AppUIMessage["role"]
  addToolOutput: ChatAddToolOutputFunction<AppUIMessage>
}) {
  if (part.type === "text") {
    if (!part.text.trim()) return null
    return (
      <Bubble align={role === "user" ? "end" : "start"} variant={role === "user" ? "default" : "muted"}>
        <BubbleContent className="whitespace-pre-wrap">{part.text}</BubbleContent>
      </Bubble>
    )
  }

  if (part.type === "tool-askSlider") {
    if (part.state === "input-available") {
      return (
        <SliderQuestion
          input={part.input as AskSliderInput}
          onSubmit={(value) =>
            addToolOutput({ tool: "askSlider", toolCallId: part.toolCallId, output: value })
          }
        />
      )
    }
    if (part.state === "output-available") {
      return <SliderAnswer input={part.input as AskSliderInput} output={part.output as number} />
    }
    return null
  }

  if (part.type === "tool-askTiles") {
    if (part.state === "input-available") {
      return (
        <TilesQuestion
          input={part.input as AskTilesInput}
          onSubmit={(values) =>
            addToolOutput({ tool: "askTiles", toolCallId: part.toolCallId, output: values })
          }
        />
      )
    }
    if (part.state === "output-available") {
      return <TilesAnswer input={part.input as AskTilesInput} output={part.output as string[]} />
    }
    return null
  }

  if (part.type === "tool-showMythCard") {
    if (part.state === "input-available" || part.state === "output-available") {
      return <MythCard input={part.input as ShowMythCardInput} />
    }
    return null
  }

  if (part.type === "tool-showReport") {
    if (part.state === "input-available" || part.state === "output-available") {
      return (
        <Marker variant="separator">
          <MarkerContent>Report updated — see the panel</MarkerContent>
        </Marker>
      )
    }
    return null
  }

  // loadSkill / readSkillFile and anything else: invisible plumbing, nothing to render.
  return null
}
