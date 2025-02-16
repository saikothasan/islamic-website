import type { Metadata } from "next"
import { constructMetadata } from "../../metadata.config"
import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export async function generateMetadata({ params }: { params: { surahNumber: string } }): Promise<Metadata> {
  const surah = await fetchSurah(params.surahNumber)
  return constructMetadata({
    title: `Tafsir of Surah ${surah.englishName}`,
    description: `Explore the Tafsir (explanation) of Surah ${surah.englishName} - ${surah.englishNameTranslation}`,
    path: `/tafsir/${params.surahNumber}`,
  })
}

async function fetchSurah(surahNumber: string) {
  try {
    const res = await fetch(`http://api.alquran.cloud/v1/surah/${surahNumber}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error("Failed to fetch")
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

async function fetchTafsir(surahNumber: string) {
  try {
    const res = await fetch(
      `https://api.quran.com/api/v4/quran/tafsirs/en-tafsir-ibn-kathir?chapter_number=${surahNumber}`,
      {
        next: { revalidate: 3600 },
      },
    )
    if (!res.ok) {
      throw new Error(`Failed to fetch tafsir: ${res.status} ${res.statusText}`)
    }
    const data = await res.json()
    return data.tafsirs
  } catch (error) {
    console.error("Error fetching tafsir:", error)
    return null
  }
}

function TafsirSkeleton() {
  return (
    <Card className="mb-4">
      <CardHeader>
        <Skeleton className="h-4 w-[250px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-3/4 mt-2" />
      </CardContent>
    </Card>
  )
}

export default async function SurahTafsirPage({ params }: { params: { surahNumber: string } }) {
  const surah = await fetchSurah(params.surahNumber)
  const tafsir = await fetchTafsir(params.surahNumber)

  if (!surah) {
    return <div className="container py-8">Surah not found</div>
  }

  return (
    <div className="container py-8">
      <Link href="/tafsir" className="flex items-center text-primary hover:underline mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Tafsir Index
      </Link>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Tafsir of Surah {surah.englishName}</h1>
        <p className="text-muted-foreground">
          {surah.englishNameTranslation} • {surah.numberOfAyahs} verses
        </p>
      </div>
      {tafsir ? (
        <Suspense fallback={[...Array(10)].map((_, i) => <TafsirSkeleton key={i} />)}>
          {tafsir.map((ayah: any) => (
            <Card key={ayah.id} className="mb-4">
              <CardHeader>
                <CardTitle>Verse {ayah.verse_key.split(":")[1]}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-right text-xl mb-4 font-arabic">{ayah.verse_key}</p>
                <p>{ayah.text}</p>
              </CardContent>
            </Card>
          ))}
        </Suspense>
      ) : (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load tafsir. Please try again later.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

