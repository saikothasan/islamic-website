import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { Suspense } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"

export const metadata: Metadata = constructMetadata({
  title: "The Holy Quran",
  description: "Read and study the Holy Quran with translations and audio recitations",
  path: "/quran",
})

async function fetchSurahs() {
  try {
    const res = await fetch("http://api.alquran.cloud/v1/surah", {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error("Failed to fetch")
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error("Error:", error)
    return []
  }
}

function SurahSkeleton() {
  return (
    <Card className="h-[100px]">
      <CardHeader>
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </CardHeader>
    </Card>
  )
}

export default function QuranPage() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t.quran}</h1>
        <p className="text-muted-foreground">{t.quranDescription}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t.quickLinks}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link href="/quran/1" className="text-primary hover:underline">
                  {t.surahAlFatihah}
                </Link>
              </li>
              <li>
                <Link href="/quran/36" className="text-primary hover:underline">
                  {t.surahYaSin}
                </Link>
              </li>
              <li>
                <Link href="/quran/67" className="text-primary hover:underline">
                  {t.surahAlMulk}
                </Link>
              </li>
              <li>
                <Link href="/quran/112" className="text-primary hover:underline">
                  {t.surahAlIkhlas}
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t.quranAudio}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{t.quranAudioDescription}</p>
            <Link href="/audio">
              <Button>
                {t.goToAudioRecitations}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t.tafsir}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{t.tafsirDescription}</p>
            <Link href="/tafsir">
              <Button>
                {t.exploreTafsir}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-bold mb-4">{t.allSurahs}</h2>
      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(114)].map((_, i) => (
              <SurahSkeleton key={i} />
            ))}
          </div>
        }
      >
        <SurahList />
      </Suspense>
    </div>
  )
}

async function SurahList() {
  const surahs = await fetchSurahs()
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {surahs.map((surah: any) => (
        <Link key={surah.number} href={`/quran/${surah.number}`}>
          <Card className="h-full transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {surah.number}. {language === "en" ? surah.englishName : surah.name}
                </CardTitle>
                <span className="text-2xl font-arabic">{surah.name}</span>
              </div>
              <p className="text-muted-foreground">
                {language === "en" ? surah.englishNameTranslation : surah.englishName} • {surah.numberOfAyahs}{" "}
                {t.verses}
              </p>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}

