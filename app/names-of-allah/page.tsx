import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { NamesOfAllahList } from "./names-of-allah-list"

export const metadata: Metadata = constructMetadata({
  title: "99 Names of Allah",
  description: "Learn about the 99 beautiful names of Allah",
  path: "/names-of-allah",
})

export default function NamesOfAllahPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">99 Names of Allah</h1>
      <p className="mb-6">Learn about the 99 beautiful names of Allah</p>
      <NamesOfAllahList />
    </div>
  )
}

