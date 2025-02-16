import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { RamadanInfo } from "./ramadan-info"

export const metadata: Metadata = constructMetadata({
  title: "Ramadan Information",
  description: "Learn about the holy month of Ramadan, its significance, and practices",
  path: "/ramadan",
})

export default function RamadanPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Ramadan Information</h1>
        <p className="text-muted-foreground">Learn about the holy month of Ramadan, its significance, and practices</p>
      </div>
      <RamadanInfo />
    </div>
  )
}

