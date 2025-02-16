"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

type Favorite = {
  id: string
  type: "quran" | "hadith"
  content: string
  reference: string
}

export function FavoritesList({ userId }: { userId: string }) {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    // In a real application, you would fetch the user's favorites from your API
    // For this example, we'll use some dummy data
    setFavorites([
      {
        id: "1",
        type: "quran",
        content: "This is the Book about which there is no doubt, a guidance for those conscious of Allah",
        reference: "Quran 2:2",
      },
      {
        id: "2",
        type: "hadith",
        content: "The best among you are those who have the best manners and character.",
        reference: "Sahih al-Bukhari 3559",
      },
    ])
  }, [])

  return (
    <div className="grid gap-4">
      {favorites.map((favorite) => (
        <Card key={favorite.id}>
          <CardHeader>
            <CardTitle>{favorite.type === "quran" ? "Quran Verse" : "Hadith"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">{favorite.content}</p>
            <p className="text-sm text-muted-foreground">{favorite.reference}</p>
            <Link href={favorite.type === "quran" ? "/quran" : "/hadith"} className="text-primary hover:underline">
              View in context
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

