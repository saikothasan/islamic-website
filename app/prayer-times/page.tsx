import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { PrayerTimesClient } from "./prayer-times-client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const metadata: Metadata = constructMetadata({
  title: "Prayer Times",
  description: "Get accurate prayer times for your location",
  path: "/prayer-times",
})

export default function PrayerTimesPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Prayer Times</h1>
        <p className="text-muted-foreground">Get accurate prayer times based on your location</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>About Prayer Times</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The five daily prayers in Islam are:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Fajr (Dawn Prayer)</li>
              <li>Dhuhr (Noon Prayer)</li>
              <li>Asr (Afternoon Prayer)</li>
              <li>Maghrib (Sunset Prayer)</li>
              <li>Isha (Night Prayer)</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calculation Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Prayer times are calculated based on the sun's position and can vary slightly depending on the calculation
              method used. Common methods include:
            </p>
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
            <CardTitle>Prayer Time Adjustments</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Prayer times may need to be adjusted for:</p>
            <ul className="list-disc list-inside mt-2">
              <li>High latitude areas</li>
              <li>Daylight Saving Time</li>
              <li>Local customs or Juristic preferences</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <PrayerTimesClient />
    </div>
  )
}

