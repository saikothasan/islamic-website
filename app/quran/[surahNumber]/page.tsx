import { ArrowLeft } from "lucide-react"
import Link from "next/link"

async function fetchSurah(surahNumber) {
  const res = await fetch(`http://api.alquran.cloud/v1/surah/${surahNumber}`)
  const data = await res.json()
  return data.data
}

export default async function SurahPage({ params }) {
  const surah = await fetchSurah(params.surahNumber)

  return (
    <div className="container mx-auto p-4">
      <Link href="/quran" className="flex items-center text-emerald-700 hover:text-emerald-900 mb-4">
        <ArrowLeft className="mr-2" /> Back to Surah List
      </Link>
      <h1 className="text-3xl font-bold mb-6">
        {surah.englishName} - {surah.name}
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-emerald-800 mb-4">{surah.englishNameTranslation}</h2>
        {surah.ayahs.map((ayah) => (
          <div key={ayah.number} className="mb-4">
            <p className="text-right text-2xl mb-2">{ayah.text}</p>
            <p className="text-sm text-gray-600">Verse {ayah.numberInSurah}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

