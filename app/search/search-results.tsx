"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

type SearchResult = {
  title: string
  description: string
  link: string
}

export function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      // In a real application, you would call your backend API here
      // For this example, we'll simulate an API call with some dummy data
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setResults([
        {
          title: "Surah Al-Baqarah",
          description: "The second and longest chapter of the Quran",
          link: "/quran/2",
        },
        {
          title: "Hadith on Kindness",
          description: 'Narrated by Bukhari: The Prophet (ﷺ) said, "Kindness is a mark of faith..."',
          link: "/hadith/bukhari/6076",
        },
        {
          title: "Prayer Times",
          description: "Get accurate prayer times for your location",
          link: "/prayer-times",
        },
      ])
      setLoading(false)
    }

    fetchResults()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (results.length === 0) {
    return <div>No results found for "{query}"</div>
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

