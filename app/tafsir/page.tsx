import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { Suspense } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

export const metadata: Metadata = constructMetadata({
  title: "Tafsir (Quranic Exegesis)",
  description: "Explore in-depth explanations and interpretations of the Holy Quran",
  path: "/tafsir",
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

export default async function TafsirPage() {
  const surahs = await fetchSurahs()

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Tafsir (Quranic Exegesis)</h1>
        <p className="text-muted-foreground">Explore in-depth explanations and interpretations of the Holy Quran</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={[...Array(114)].map((_, i) => <SurahSkeleton key={i} />)}>
          {surahs.map((surah: any) => (
            <Link key={surah.number} href={`/tafsir/${surah.number}`}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      {surah.number}. {surah.englishName}
                    </CardTitle>
                    <span className="text-2xl font-arabic">{surah.name}</span>
                  </div>
                  <p className="text-muted-foreground">
                    {surah.englishNameTranslation} • {surah.numberOfAyahs} verses
                  </p>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </Suspense>
      </div>
    </div>
  )
}

