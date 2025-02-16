"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { translations } from "@/lib/translations"

type SearchResult = {
  title: string
  description: string
  link: string
}

export function SearchResults({ query, lang }: { query: string; lang: "en" | "bn" }) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)
  const t = translations[lang]

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      // In a real application, you would call your backend API here
      // For this example, we'll simulate an API call with some dummy data
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setResults([
        {
          title: lang === "en" ? "Surah Al-Baqarah" : "সূরা আল-বাকারা",
          description: lang === "en" ? "The second and longest chapter of the Quran" : "কুরআনের দ্বিতীয় এবং দীর্ঘতম অধ্যায়",
          link: `/${lang}/quran/2`,
        },
        {
          title: lang === "en" ? "Hadith on Kindness" : "সদয়তা সম্পর্কে হাদিস",
          description:
            lang === "en"
              ? 'Narrated by Bukhari: The Prophet (ﷺ) said, "Kindness is a mark of faith..."'
              : 'বুখারী বর্ণিত: নবী (ﷺ) বলেছেন, "সদয়তা ঈমানের একটি চিহ্ন..."',
          link: `/${lang}/hadith/bukhari/6076`,
        },
        {
          title: lang === "en" ? "Prayer Times" : "নামাজের সময়",
          description:
            lang === "en" ? "Get accurate prayer times for your location" : "আপনার অবস্থানের জন্য সঠিক নামাজের সময় পান",
          link: `/${lang}/prayer-times`,
        },
      ])
      setLoading(false)
    }

    fetchResults()
  }, [lang])

  if (loading) {
    return <div>{t.loading}</div>
  }

  if (results.length === 0) {
    return <div>{t.noResults.replace("{query}", query)}</div>
  }

  return (
    <div className="grid gap-4">
      {results.map((result, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>
              <Link href={result.link} className="hover:underline">
                {result.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

