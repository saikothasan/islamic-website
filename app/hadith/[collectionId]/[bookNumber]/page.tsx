import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

async function fetchHadiths(collectionId: string, bookNumber: string) {
  try {
    const res = await fetch(
      `https://api.sunnah.com/v1/collections/${collectionId}/books/${bookNumber}/hadiths?limit=20&page=1`,
      {
        headers: {
          "X-API-Key": process.env.SUNNAH_API_KEY!,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch hadiths: ${res.statusText}`)
    }

    const data = await res.json()
    return { data: data.data, error: null }
  } catch (error) {
    console.error("Error fetching hadiths:", error)
    return { data: null, error: "Failed to load hadiths. Please try again later." }
  }
}

export default async function HadithBookPage({
  params,
}: {
  params: { collectionId: string; bookNumber: string }
}) {
  const { data: hadiths, error } = await fetchHadiths(params.collectionId, params.bookNumber)

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Link
          href={`/hadith/${params.collectionId}`}
          className="flex items-center text-emerald-700 hover:text-emerald-900 mb-4"
        >
          <ArrowLeft className="mr-2" /> Back to Collection
        </Link>
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        href={`/hadith/${params.collectionId}`}
        className="flex items-center text-emerald-700 hover:text-emerald-900 mb-4"
      >
        <ArrowLeft className="mr-2" /> Back to Collection
      </Link>
      <h1 className="text-3xl font-bold mb-6">Book {params.bookNumber}</h1>
      <div className="space-y-6">
        {hadiths?.map((hadith) => (
          <div key={hadith.hadithNumber} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">Hadith #{hadith.hadithNumber}</span>
              <span className="text-sm text-emerald-600">Grade: {hadith.grade || "Not specified"}</span>
            </div>
            {hadith.arabicText && <p className="text-right text-xl mb-4 leading-loose">{hadith.arabicText}</p>}
            {hadith.englishText && <p className="text-gray-700 leading-relaxed">{hadith.englishText}</p>}
            {hadith.narrator && <p className="text-sm text-gray-600 mt-4">Narrator: {hadith.narrator}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

