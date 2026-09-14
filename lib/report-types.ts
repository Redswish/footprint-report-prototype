import { z } from "zod"

export const insightCardSchema = z.object({
  kind: z.enum(["win", "watch", "surprise"]),
  title: z.string(),
  detail: z.string(),
})
export type InsightCard = z.infer<typeof insightCardSchema>

export const comparisonRowSchema = z.object({
  category: z.string(),
  yourValue: z.string(),
  comparableValue: z.string(),
  basis: z.string(),
})
export type ComparisonRow = z.infer<typeof comparisonRowSchema>

export const estimateNoteSchema = z.object({
  label: z.string(),
  sourced: z.boolean(),
})
export type EstimateNote = z.infer<typeof estimateNoteSchema>

export const showReportInputSchema = z.object({
  headline: z.object({
    low: z.number(),
    high: z.number(),
    unit: z.string(),
    basis: z.string(),
  }),
  comparisons: z.array(comparisonRowSchema),
  scale: z.object({
    currentPosition: z.number().min(0).max(1),
    futurePosition: z.number().min(0).max(1),
    scaleLabel: z.string().optional(),
  }),
  insights: z.array(insightCardSchema),
  closingLine: z.string(),
  estimateNotes: z.array(estimateNoteSchema).optional(),
})
export type ShowReportInput = z.infer<typeof showReportInputSchema>

export const showMythCardInputSchema = z.object({
  claim: z.string(),
  verdict: z.enum(["overrated", "worth-it", "partially-true"]),
  explanation: z.string(),
})
export type ShowMythCardInput = z.infer<typeof showMythCardInputSchema>

export const askTilesOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  hint: z.string().optional(),
})

export const askTilesInputSchema = z.object({
  question: z.string(),
  options: z.array(askTilesOptionSchema).min(2),
  multiple: z.boolean(),
})
export type AskTilesInput = z.infer<typeof askTilesInputSchema>

export const askTilesOutputSchema = z.array(z.string())
export type AskTilesOutput = z.infer<typeof askTilesOutputSchema>

export const askSliderInputSchema = z.object({
  question: z.string(),
  min: z.number(),
  max: z.number(),
  step: z.number(),
  unit: z.string().optional(),
  defaultValue: z.number().optional(),
  helperText: z.string().optional(),
})
export type AskSliderInput = z.infer<typeof askSliderInputSchema>

export const askSliderOutputSchema = z.number()
export type AskSliderOutput = z.infer<typeof askSliderOutputSchema>
