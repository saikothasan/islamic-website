import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { PrayerTimesClient } from "./client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"

export const metadata: Metadata = constructMetadata({
  title: "Prayer Times",
  description: "Get accurate prayer times for your location",
  path: "/prayer-times",
})

export default function PrayerTimesPage() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t.prayerTimes}</h1>
        <p className="text-muted-foreground">{t.prayerTimesDescription}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t.aboutPrayerTimes}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t.prayerTimesDescription}</p>
            <ul className="list-disc list-inside mt-2">
              <li>{t.fajr}</li>
              <li>{t.dhuhr}</li>
              <li>{t.asr}</li>
              <li>{t.maghrib}</li>
              <li>{t.isha}</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t.calculationMethods}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t.calculationMethods}:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Muslim World League</li>
              <li>Islamic Society of North America (ISNA)</li>
              <li>Egyptian General Authority of Survey</li>
              <li>Umm Al-Qura University, Makkah</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t.prayerTimeAdjustments}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t.prayerTimeAdjustments}:</p>
            <ul className="list-disc list-inside mt-2">
              <li>{t.highLatitudeAreas}</li>
              <li>{t.daylightSavingTime}</li>
              <li>{t.localCustoms}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <PrayerTimesClient />
    </div>
  )
}

