import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { IslamicCalendar } from "./islamic-calendar"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"

export const metadata: Metadata = constructMetadata({
  title: "Islamic Calendar",
  description: "View the Islamic Hijri calendar and important Islamic dates",
  path: "/calendar",
})

export default function CalendarPage() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t.islamicCalendar}</h1>
        <p className="text-muted-foreground">{t.islamicCalendarDescription}</p>
      </div>
      <IslamicCalendar />
    </div>
  )
}

