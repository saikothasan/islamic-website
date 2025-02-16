import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { TafsirList } from "./tafsir-list"

export const metadata: Metadata = constructMetadata({
  title: "Tafsir (Quranic Exegesis)",
  description: "Explore in-depth explanations and interpretations of the Holy Quran",
  path: "/tafsir",
})

export default function TafsirPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Tafsir (Quranic Exegesis)</h1>
        <p className="text-muted-foreground">Explore in-depth explanations and interpretations of the Holy Quran</p>
      </div>
      <TafsirList />
    </div>
  )
}

