import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Moon, Sun, Utensils, Book, Heart } from "lucide-react"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"

export const metadata: Metadata = constructMetadata({
  title: "Ramadan Information",
  description: "Learn about the holy month of Ramadan, its significance, and practices",
  path: "/ramadan",
})

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

export default function RamadanPage() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t.ramadan}</h1>
        <p className="text-muted-foreground">{t.ramadanDescription}</p>
      </div>
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
    </div>
  )
}

