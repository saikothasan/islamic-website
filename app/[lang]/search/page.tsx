import type { Metadata } from "next"
import { constructMetadata } from "../../metadata.config"
import { SearchResults } from "./search-results"
import { translations } from "@/lib/translations"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return constructMetadata({
    title: "Search Results",
    description: "Search results for Islamic content",
    path: "/search",
    language: params.lang as "en" | "bn",
  })
}

export default function SearchPage({
  params,
  searchParams,
}: {
  params: { lang: string }
  searchParams: { q: string }
}) {
  const query = searchParams.q
  const t = translations[params.lang as "en" | "bn"]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t.searchResults}</h1>
        <p className="text-muted-foreground">{t.showingResultsFor.replace("{query}", query)}</p>
      </div>
      <SearchResults query={query} lang={params.lang as "en" | "bn"} />
    </div>
  )
}

