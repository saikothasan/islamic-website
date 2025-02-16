"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const islamicMonths = [
  "Muharram",
  "Safar",
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  "Jumada al-Awwal",
  "Jumada al-Thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
]

const importantDates = {
  "1-1": "Islamic New Year",
  "10-1": "Day of Ashura",
  "12-3": "Mawlid al-Nabi (Birth of the Prophet)",
  "27-7": "Laylat al-Mi'raj",
  "15-8": "Laylat al-Bara'ah",
  "1-9": "First day of Ramadan",
  "27-9": "Laylat al-Qadr",
  "1-10": "Eid al-Fitr",
  "8-12": "Day of Arafah",
  "10-12": "Eid al-Adha",
}

export function IslamicCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getIslamicDate = (date: Date) => {
    const options = { calendar: "islamic", day: "numeric", month: "long", year: "numeric" } as const
    return date.toLocaleDateString("en-US-u-ca-islamic", options)
  }

  const [islamicMonth, islamicDay, islamicYear] = getIslamicDate(currentDate).split(" ")

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))
  }

  const getImportantDate = (day: number) => {
    const key = `${day}-${islamicMonths.indexOf(islamicMonth) + 1}`
    return importantDates[key as keyof typeof importantDates]
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button onClick={prevMonth} variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <CardTitle>{`${islamicMonth} ${islamicYear}`}</CardTitle>
          <Button onClick={nextMonth} variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-bold">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - currentDate.getDay() + 1
            const importantDate = getImportantDate(day)
            return (
              <div
                key={i}
                className={`p-2 ${day === Number.parseInt(islamicDay) ? "bg-primary text-primary-foreground" : ""} 
                            ${importantDate ? "bg-secondary text-secondary-foreground" : ""}`}
              >
                {day > 0 && day <= 30 ? day : ""}
                {importantDate && <div className="text-xs mt-1">{importantDate}</div>}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

