import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

async function fetchHadithCollection(collectionId: string) {
  try {
    const res = await fetch(`https://api.sunnah.com/v1/collections/${collectionId}/books`, {
      headers: {
        "X-API-Key": process.env.SUNNAH_API_KEY!,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch hadith collection: ${res.statusText}`)
    }

    const data = await res.json()
    return { data: data.data, error: null }
  } catch (error) {
    console.error("Error fetching hadith collection:", error)
    return { data: null, error: "Failed to load hadith collection. Please try again later." }
  }
}

export default async function HadithCollectionPage({ params }: { params: { collectionId: string } }) {
  const { data: books, error } = await fetchHadithCollection(params.collectionId)

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Link href="/hadith" className="flex items-center text-emerald-700 hover:text-emerald-900 mb-4">
          <ArrowLeft className="mr-2" /> Back to Collections
        </Link>
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  const collectionNames = {
    bukhari: "Sahih al-Bukhari",
    muslim: "Sahih Muslim",
    abudawud: "Sunan Abu Dawud",
    tirmidhi: "Jami` at-Tirmidhi",
    nasai: "Sunan an-Nasa'i",
    ibnmajah: "Sunan Ibn Majah",
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/hadith" className="flex items-center text-emerald-700 hover:text-emerald-900 mb-4">
        <ArrowLeft className="mr-2" /> Back to Collections
      </Link>
      <h1 className="text-3xl font-bold mb-6">
        {collectionNames[params.collectionId as keyof typeof collectionNames] || params.collectionId}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books?.map((book) => (
          <Link
            key={book.bookNumber}
            href={`/hadith/${params.collectionId}/${book.bookNumber}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-emerald-800">{book.bookName}</h2>
            <p className="text-gray-600 mt-2">Hadiths: {book.numberOfHadith}</p>
            {book.arabicBookName && <p className="text-right text-lg mt-2 text-emerald-600">{book.arabicBookName}</p>}
          </Link>
        ))}
      </div>
    </div>
  )
}

