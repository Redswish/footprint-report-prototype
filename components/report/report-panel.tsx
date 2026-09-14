import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ComparisonRows } from "./comparison-rows"
import { InsightCard } from "./insight-card"
import { ScaleVisualization } from "./scale-visualization"
import type { ShowReportInput } from "@/lib/report-types"

export function ReportPanel({ report }: { report: ShowReportInput }) {
  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto p-5">
      <div>
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Your footprint
        </p>
        <p className="text-3xl font-semibold">
          {report.headline.low}–{report.headline.high}{" "}
          <span className="text-lg font-normal text-muted-foreground">
            {report.headline.unit}
          </span>
        </p>
        <p className="text-sm text-muted-foreground">{report.headline.basis}</p>
      </div>

      <ScaleVisualization
        currentPosition={report.scale.currentPosition}
        futurePosition={report.scale.futurePosition}
        scaleLabel={report.scale.scaleLabel}
      />

      <Separator />

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">How you compare</p>
        <ComparisonRows rows={report.comparisons} />
      </div>

      <Separator />

      <div className="flex flex-col gap-3">
        {report.insights.map((insight, i) => (
          <InsightCard key={`${insight.kind}-${i}`} insight={insight} />
        ))}
      </div>

      <Separator />

      <p className="text-sm leading-relaxed">{report.closingLine}</p>

      {report.estimateNotes && report.estimateNotes.length > 0 ? (
        <div className="flex flex-col gap-1.5 pt-1">
          {report.estimateNotes.map((note) => (
            <div key={note.label} className="flex items-center gap-1.5 text-xs">
              <Badge
                variant={note.sourced ? "outline" : "secondary"}
                className="shrink-0"
              >
                {note.sourced ? "Sourced" : "Estimated"}
              </Badge>
              <span className="text-muted-foreground">{note.label}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
