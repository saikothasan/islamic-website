import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { SurahList } from "./surah-list"

export const metadata: Metadata = constructMetadata({
  title: "The Holy Quran",
  description: "Read and study the Holy Quran with translations and audio recitations",
  path: "/quran",
})

export default function QuranPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">The Holy Quran</h1>
        <p className="text-muted-foreground">Read and study the Holy Quran with translations and audio recitations</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link href="/quran/1" className="text-primary hover:underline">
                  Surah Al-Fatihah
                </Link>
              </li>
              <li>
                <Link href="/quran/36" className="text-primary hover:underline">
                  Surah Ya-Sin
                </Link>
              </li>
              <li>
                <Link href="/quran/67" className="text-primary hover:underline">
                  Surah Al-Mulk
                </Link>
              </li>
              <li>
                <Link href="/quran/112" className="text-primary hover:underline">
                  Surah Al-Ikhlas
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quran Audio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Listen to beautiful Quran recitations by various reciters.</p>
            <Link href="/audio">
              <Button>
                Go to Audio Recitations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tafsir</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Explore in-depth explanations and interpretations of the Quran.</p>
            <Link href="/tafsir">
              <Button>
                Explore Tafsir
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-bold mb-4">All Surahs</h2>
      <SurahList />
    </div>
  )
}

