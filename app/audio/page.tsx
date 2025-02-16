import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { QuranAudioPlayer } from "./quran-audio-player"

export const metadata: Metadata = constructMetadata({
  title: "Quran Audio Recitations",
  description: "Listen to beautiful Quran recitations by various reciters",
  path: "/audio",
})

export default function QuranAudioPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Quran Audio Recitations</h1>
        <p className="text-muted-foreground">Listen to beautiful Quran recitations by various reciters</p>
      </div>
      <QuranAudioPlayer />
    </div>
  )
}

