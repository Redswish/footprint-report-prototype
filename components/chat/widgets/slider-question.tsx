"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { AskSliderInput } from "@/lib/report-types"

export function SliderQuestion({
  input,
  onSubmit,
}: {
  input: AskSliderInput
  onSubmit: (value: number) => void
}) {
  const [value, setValue] = useState(
    input.defaultValue ?? Math.round((input.min + input.max) / 2)
  )

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border border-border bg-card p-4">
      <p className="text-sm font-medium">{input.question}</p>
      {input.helperText ? (
        <p className="text-xs text-muted-foreground">{input.helperText}</p>
      ) : null}
      <div className="flex flex-col gap-2 pt-1">
        <Slider
          value={[value]}
          min={input.min}
          max={input.max}
          step={input.step}
          onValueChange={(v) => setValue(Array.isArray(v) ? v[0] : v)}
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {input.min}
            {input.unit ?? ""}
          </span>
          <span className="text-sm font-medium text-foreground">
            {value}
            {input.unit ?? ""}
          </span>
          <span>
            {input.max}
            {input.unit ?? ""}
          </span>
        </div>
      </div>
      <Button size="sm" className="self-end" onClick={() => onSubmit(value)}>
        Continue
      </Button>
    </div>
  )
}

export function SliderAnswer({
  input,
  output,
}: {
  input: AskSliderInput
  output: number
}) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1 rounded-xl border border-border bg-muted/50 p-4">
      <p className="text-xs text-muted-foreground">{input.question}</p>
      <p className="text-sm font-medium">
        {output}
        {input.unit ?? ""}
      </p>
    </div>
  )
}
