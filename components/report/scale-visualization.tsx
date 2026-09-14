function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

function Marker({
  position,
  label,
  side,
  tone,
}: {
  position: number
  label: string
  side: "above" | "below"
  tone: "current" | "future"
}) {
  return (
    <div
      className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
      style={{ left: `${clamp01(position) * 100}%` }}
    >
      {side === "above" ? (
        <span className="-order-1 mb-5 rounded-full bg-card px-1.5 py-0.5 text-[10px] whitespace-nowrap text-muted-foreground ring-1 ring-border">
          {label}
        </span>
      ) : null}
      <span
        className="size-3 rounded-full ring-2 ring-card"
        style={{
          backgroundColor:
            tone === "current" ? "var(--primary)" : "var(--accent-foreground)",
        }}
      />
      {side === "below" ? (
        <span className="mt-5 rounded-full bg-card px-1.5 py-0.5 text-[10px] whitespace-nowrap text-muted-foreground ring-1 ring-border">
          {label}
        </span>
      ) : null}
    </div>
  )
}

export function ScaleVisualization({
  currentPosition,
  futurePosition,
  scaleLabel,
}: {
  currentPosition: number
  futurePosition: number
  scaleLabel?: string
}) {
  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="relative mx-1.5 h-1.5 rounded-full bg-gradient-to-r from-secondary via-accent to-destructive/50">
        <Marker position={currentPosition} label="Now" side="above" tone="current" />
        <Marker
          position={futurePosition}
          label="With the wins"
          side="below"
          tone="future"
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Low individual footprint</span>
        <span>High individual footprint</span>
      </div>
      {scaleLabel ? (
        <p className="text-xs text-muted-foreground">{scaleLabel}</p>
      ) : null}
    </div>
  )
}
