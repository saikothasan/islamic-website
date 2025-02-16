import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { UserProfile } from "./user-profile"

export const metadata: Metadata = constructMetadata({
  title: "User Profile",
  description: "View and edit your IslamicHub profile",
  path: "/profile",
})

export default async function ProfilePage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Your Profile</h1>
        <p className="text-muted-foreground">View and edit your IslamicHub profile</p>
      </div>
      <UserProfile user={session.user} />
    </div>
  )
}

