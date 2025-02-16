"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, MapPin } from "lucide-react"

type PrayerTimes = {
  [key: string]: string
}

const calculationMethods = [
  { id: "1", name: "Muslim World League" },
  { id: "2", name: "Islamic Society of North America (ISNA)" },
  { id: "3", name: "Egyptian General Authority of Survey" },
  { id: "4", name: "Umm Al-Qura University, Makkah" },
  { id: "5", name: "University of Islamic Sciences, Karachi" },
]

export function PrayerTimesClient() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null)
  const [location, setLocation] = useState({ latitude: null, longitude: null })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [calculationMethod, setCalculationMethod] = useState("2") // Default to ISNA

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          setError("Unable to get your location. Please enable location services.")
          setLoading(false)
        },
      )
    } else {
      setError("Geolocation is not supported by your browser.")
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchPrayerTimes()
    }
  }, [location]) // Removed calculationMethod from dependencies

  const fetchPrayerTimes = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `http://api.aladhan.com/v1/timings?latitude=${location.latitude}&longitude=${location.longitude}&method=${calculationMethod}`,
      )
      const data = await res.json()
      setPrayerTimes(data.data.timings)
      setLoading(false)
    } catch (error) {
      setError("Unable to fetch prayer times. Please try again later.")
      setLoading(false)
    }
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (loading) {
    return <div>Loading prayer times...</div>
  }

  const prayerNames = {
    Fajr: "Fajr",
    Sunrise: "Sunrise",
    Dhuhr: "Dhuhr",
    Asr: "Asr",
    Maghrib: "Maghrib",
    Isha: "Isha",
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            Your Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Latitude: {location.latitude?.toFixed(4)}</p>
          <p>Longitude: {location.longitude?.toFixed(4)}</p>
        </CardContent>
      </Card>
      <div>
        <label htmlFor="calculation-method" className="block text-sm font-medium text-gray-700 mb-2">
          Calculation Method
        </label>
        <Select onValueChange={setCalculationMethod} value={calculationMethod}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a calculation method" />
          </SelectTrigger>
          <SelectContent>
            {calculationMethods.map((method) => (
              <SelectItem key={method.id} value={method.id}>
                {method.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(prayerNames).map(([key, name]) => (
          <Card key={key} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{prayerTimes?.[key]}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

