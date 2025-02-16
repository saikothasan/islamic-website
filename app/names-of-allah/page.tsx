import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"

async function fetchNamesOfAllah() {
  const res = await fetch("https://api.aladhan.com/asmaAlHusna")
  const data = await res.json()
  return data.data
}

export default async function NamesOfAllahPage() {
  const names = await fetchNamesOfAllah()
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{t.namesOfAllah}</h1>
      <p className="mb-6">{t.namesOfAllahDescription}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {names.map((name: any) => (
          <div key={name.number} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-2">{name.name}</h2>
            <p className="text-lg mb-2">{name.transliteration}</p>
            <p className="text-gray-600">{language === "en" ? name.en.meaning : name.bn.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

