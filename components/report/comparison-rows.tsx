import type { ComparisonRow } from "@/lib/report-types"

export function ComparisonRows({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="flex flex-col gap-3">
      {rows.map((row) => (
        <div
          key={row.category}
          className="flex flex-col gap-1.5 rounded-lg border border-border p-3"
        >
          <span className="text-sm font-medium">{row.category}</span>
          <div className="flex items-center gap-4 text-sm">
            <span>
              <span className="text-muted-foreground">You: </span>
              {row.yourValue}
            </span>
            <span>
              <span className="text-muted-foreground">Comparable: </span>
              {row.comparableValue}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{row.basis}</span>
        </div>
      ))}
    </div>
  )
}
