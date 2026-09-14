import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { InsightCard as InsightCardData } from "@/lib/report-types"

const kindLabel: Record<InsightCardData["kind"], string> = {
  win: "Win",
  watch: "Watch",
  surprise: "Surprise",
}

const kindVariant: Record<
  InsightCardData["kind"],
  "default" | "outline" | "secondary"
> = {
  win: "default",
  watch: "outline",
  surprise: "secondary",
}

export function InsightCard({ insight }: { insight: InsightCardData }) {
  return (
    <Card size="sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{insight.title}</CardTitle>
          <Badge variant={kindVariant[insight.kind]}>
            {kindLabel[insight.kind]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {insight.detail}
      </CardContent>
    </Card>
  )
}
