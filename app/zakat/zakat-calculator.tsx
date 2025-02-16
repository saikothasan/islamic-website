"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"

type AssetType = "cash" | "gold" | "silver" | "stocks" | "property"

const assetTypes: Record<AssetType, { name: string; nisab: number }> = {
  cash: { name: "Cash", nisab: 5200 }, // Approximate nisab value in USD
  gold: { name: "Gold", nisab: 87.48 }, // Nisab in grams
  silver: { name: "Silver", nisab: 612.36 }, // Nisab in grams
  stocks: { name: "Stocks and Investments", nisab: 5200 }, // Using cash nisab
  property: { name: "Property for Trade", nisab: 5200 }, // Using cash nisab
}

export function ZakatCalculator() {
  const [assets, setAssets] = useState<Record<AssetType, number>>({
    cash: 0,
    gold: 0,
    silver: 0,
    stocks: 0,
    property: 0,
  })
  const [zakatAmount, setZakatAmount] = useState<number | null>(null)

  const handleInputChange = (type: AssetType, value: string) => {
    setAssets((prev) => ({ ...prev, [type]: Number.parseFloat(value) || 0 }))
  }

  const calculateZakat = () => {
    let totalZakatableAssets = 0
    for (const [type, amount] of Object.entries(assets)) {
      if (amount >= assetTypes[type as AssetType].nisab) {
        totalZakatableAssets += amount
      }
    }
    setZakatAmount(totalZakatableAssets * 0.025)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculate Your Zakat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {Object.entries(assetTypes).map(([type, { name, nisab }]) => (
            <div key={type} className="grid gap-2">
              <Label htmlFor={type}>
                {name} (Nisab: ${nisab})
              </Label>
              <Input
                id={type}
                type="number"
                placeholder="Enter amount"
                value={assets[type as AssetType]}
                onChange={(e) => handleInputChange(type as AssetType, e.target.value)}
              />
            </div>
          ))}
          <Button onClick={calculateZakat} className="mt-4">
            <Calculator className="mr-2 h-4 w-4" /> Calculate Zakat
          </Button>
          {zakatAmount !== null && (
            <div className="mt-4 p-4 bg-primary/10 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Zakat Amount</h3>
              <p className="text-2xl font-bold">${zakatAmount.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                This is an approximate calculation. Please consult with a scholar for a more precise determination.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

