import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { FavoritesList } from "./favorites-list"

export const metadata: Metadata = constructMetadata({
  title: "Your Favorites",
  description: "View your favorite Quran verses and Hadiths",
  path: "/favorites",
})

export default async function FavoritesPage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Your Favorites</h1>
        <p className="text-muted-foreground">View your favorite Quran verses and Hadiths</p>
      </div>
      <FavoritesList userId={session.user.id} />
    </div>
  )
}

