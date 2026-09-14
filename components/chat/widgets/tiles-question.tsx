"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { AskTilesInput } from "@/lib/report-types"

export function TilesQuestion({
  input,
  onSubmit,
}: {
  input: AskTilesInput
  onSubmit: (values: string[]) => void
}) {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border border-border bg-card p-4">
      <p className="text-sm font-medium">{input.question}</p>
      <ToggleGroup
        orientation="vertical"
        multiple={input.multiple}
        value={selected}
        onValueChange={(v) => setSelected(v)}
        className="w-full gap-2"
      >
        {input.options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            className="h-auto w-full flex-col items-start gap-0.5 rounded-lg border border-border px-3 py-2.5 text-left data-[pressed]:border-primary data-[pressed]:bg-accent"
          >
            <span className="text-sm font-medium">{option.label}</span>
            {option.hint ? (
              <span className="text-xs font-normal text-muted-foreground">
                {option.hint}
              </span>
            ) : null}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Button
        size="sm"
        className="self-end"
        disabled={selected.length === 0}
        onClick={() => onSubmit(selected)}
      >
        Continue
      </Button>
    </div>
  )
}

export function TilesAnswer({
  input,
  output,
}: {
  input: AskTilesInput
  output: string[]
}) {
  const labels = input.options
    .filter((o) => output.includes(o.value))
    .map((o) => o.label)

  return (
    <div className="flex w-full max-w-sm flex-col gap-1 rounded-xl border border-border bg-muted/50 p-4">
      <p className="text-xs text-muted-foreground">{input.question}</p>
      <p className="text-sm font-medium">{labels.join(", ") || "—"}</p>
    </div>
  )
}
