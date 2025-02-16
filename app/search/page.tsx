import type { Metadata } from "next"
import { constructMetadata } from "../metadata.config"
import { SearchResults } from "./search-results"

export const metadata: Metadata = constructMetadata({
  title: "Search Results",
  description: "Search results for Islamic content",
  path: "/search",
})

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground">Showing results for: {query}</p>
      </div>
      <SearchResults query={query} />
    </div>
  )
}

