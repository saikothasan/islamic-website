import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { IslamicCalendar } from "./islamic-calendar"

export const metadata: Metadata = constructMetadata({
  title: "Islamic Calendar",
  description: "View the Islamic Hijri calendar and important Islamic dates",
  path: "/calendar",
})

export default function CalendarPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Islamic Calendar</h1>
        <p className="text-muted-foreground">View the Islamic Hijri calendar and important Islamic dates</p>
      </div>
      <IslamicCalendar />
    </div>
  )
}

