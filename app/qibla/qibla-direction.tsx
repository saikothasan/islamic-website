"use client"

import { useState, useEffect } from "react"
import { Compass } from "lucide-react"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"

export function QiblaDirection() {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null)
  const [location, setLocation] = useState({ latitude: null, longitude: null })
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
    }
  }, [])

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetch(`https://api.aladhan.com/v1/qibla/${location.latitude}/${location.longitude}`)
        .then((res) => res.json())
        .then((data) => setQiblaDirection(data.data.direction))
    }
  }, [location])

  if (!qiblaDirection) {
    return <div>{t.loading}</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
      <Compass className="w-32 h-32 text-emerald-600 mb-4" style={{ transform: `rotate(${qiblaDirection}deg)` }} />
      <p className="text-xl font-semibold">
        {t.qiblaFromNorth.replace("{degree}", Math.round(qiblaDirection).toString())}
      </p>
    </div>
  )
}

