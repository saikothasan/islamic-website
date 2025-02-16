"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipForward, SkipBack } from "lucide-react"

const reciters = [
  { id: 1, name: "Mishari Rashid al-`Afasy" },
  { id: 2, name: "Abdul Rahman Al-Sudais" },
  { id: 3, name: "Saud Al-Shuraim" },
]

const surahs = [
  { number: 1, name: "Al-Fatihah" },
  { number: 2, name: "Al-Baqarah" },
  { number: 3, name: "Ali 'Imran" },
  // Add more surahs...
]

export function QuranAudioPlayer() {
  const [reciter, setReciter] = useState(reciters[0].id)
  const [surah, setSurah] = useState(surahs[0].number)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audio) {
      audio.pause()
    }
    const newAudio = new Audio(`https://cdn.islamic.network/quran/audio/${reciter}/${surah}.mp3`)
    setAudio(newAudio)
    setIsPlaying(false)
  }, [reciter, surah, audio]) // Added audio to dependencies

  const togglePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const changeSurah = (direction: "next" | "prev") => {
    const currentIndex = surahs.findIndex((s) => s.number === surah)
    if (direction === "next" && currentIndex < surahs.length - 1) {
      setSurah(surahs[currentIndex + 1].number)
    } else if (direction === "prev" && currentIndex > 0) {
      setSurah(surahs[currentIndex - 1].number)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quran Audio Player</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex gap-4">
            <Select onValueChange={(value) => setReciter(Number(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a reciter" />
              </SelectTrigger>
              <SelectContent>
                {reciters.map((r) => (
                  <SelectItem key={r.id} value={r.id.toString()}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSurah(Number(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a surah" />
              </SelectTrigger>
              <SelectContent>
                {surahs.map((s) => (
                  <SelectItem key={s.number} value={s.number.toString()}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center gap-4">
            <Button onClick={() => changeSurah("prev")} variant="outline" size="icon">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button onClick={togglePlayPause} variant="outline" size="icon">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button onClick={() => changeSurah("next")} variant="outline" size="icon">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

