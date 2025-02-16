"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Moon, Sun, Utensils, Book, Heart } from "lucide-react"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"

const ramadanInfo = [
  {
    title: "fasting",
    description: "fastingDescription",
    icon: Moon,
  },
  {
    title: "suhoorAndIftar",
    description: "suhoorIftarDescription",
    icon: Utensils,
  },
  {
    title: "increasedWorship",
    description: "increasedWorshipDescription",
    icon: Book,
  },
  {
    title: "nightOfPower",
    description: "nightOfPowerDescription",
    icon: Sun,
  },
  {
    title: "charity",
    description: "charityDescription",
    icon: Heart,
  },
]

export function RamadanInfo() {
  const { language } = useLanguage()
  const [t, setT] = useState(translations[language])

  useEffect(() => {
    setT(translations[language])
  }, [language])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {ramadanInfo.map((info, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <info.icon className="mr-2 h-5 w-5" />
              {t[info.title as keyof typeof t]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t[info.description as keyof typeof t]}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

