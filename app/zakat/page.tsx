import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { ZakatCalculator } from "./zakat-calculator"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const metadata: Metadata = constructMetadata({
  title: "Zakat Calculator",
  description: "Calculate your Zakat easily with our comprehensive Zakat calculator",
  path: "/zakat",
})

export default function ZakatPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Zakat Calculator</h1>
        <p className="text-muted-foreground">Calculate your Zakat easily with our comprehensive Zakat calculator</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>What is Zakat?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Zakat is one of the Five Pillars of Islam. It's a form of obligatory charity that has the potential to
              ease the suffering of millions.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Who should pay Zakat?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Zakat is due on adult Muslims of sound mind who have wealth above a minimum amount known as the nisab.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>When to pay Zakat?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Zakat is typically paid once a year on a date chosen by the individual. Many choose to pay during Ramadan
              for increased blessings.
            </p>
          </CardContent>
        </Card>
      </div>
      <ZakatCalculator />
    </div>
  )
}

