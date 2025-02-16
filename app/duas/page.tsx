import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { DuasList } from "./duas-list"

export const metadata: Metadata = constructMetadata({
  title: "Daily Duas",
  description: "Essential duas for daily life",
  path: "/duas",
})

export default function DuasPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Daily Duas</h1>
      <p className="mb-6">Essential duas for daily life</p>
      <DuasList />
    </div>
  )
}

