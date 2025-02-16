import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { QiblaDirection } from "./qibla-direction"

export const metadata: Metadata = constructMetadata({
  title: "Qibla Direction",
  description: "Find the Qibla direction from anywhere",
  path: "/qibla",
})

export default function QiblaPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Qibla Direction</h1>
      <p className="mb-6">Find the Qibla direction from anywhere</p>
      <QiblaDirection />
    </div>
  )
}

