import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ShowMythCardInput } from "@/lib/report-types"

const verdictLabel: Record<ShowMythCardInput["verdict"], string> = {
  overrated: "Overrated",
  "worth-it": "Worth it",
  "partially-true": "Partially true",
}

const verdictVariant: Record<
  ShowMythCardInput["verdict"],
  "secondary" | "default" | "outline"
> = {
  overrated: "secondary",
  "worth-it": "default",
  "partially-true": "outline",
}

export function MythCard({ input }: { input: ShowMythCardInput }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{input.claim}</CardTitle>
          <Badge variant={verdictVariant[input.verdict]}>
            {verdictLabel[input.verdict]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {input.explanation}
      </CardContent>
    </Card>
  )
}
