import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { ZakatCalculator } from "./zakat-calculator"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"

export const metadata: Metadata = constructMetadata({
  title: "Zakat Calculator",
  description: "Calculate your Zakat easily with our comprehensive Zakat calculator",
  path: "/zakat",
})

export default function ZakatPage() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t.zakatCalculator}</h1>
        <p className="text-muted-foreground">{t.zakatDescription}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t.whatIsZakat}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t.zakatDefinition}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t.whoShouldPayZakat}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t.zakatObligation}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t.whenToPayZakat}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t.zakatTiming}</p>
          </CardContent>
        </Card>
      </div>
      <ZakatCalculator />
    </div>
  )
}

