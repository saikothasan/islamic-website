"use client"

import { useState, useEffect } from "react"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"

const dailyDuas = [
  {
    title: "duaBeforeEating",
    arabic: "بِسْمِ اللهِ",
    transliteration: "Bismillah",
    translation: {
      en: "In the name of Allah",
      bn: "আল্লাহর নামে",
    },
  },
  {
    title: "duaAfterEating",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    translation: {
      en: "All praise is for Allah",
      bn: "সকল প্রশংসা আল্লাহর জন্য",
    },
  },
  // Add more duas here
]

export function DuasList() {
  const { language } = useLanguage()
  const [t, setT] = useState(translations[language])

  useEffect(() => {
    setT(translations[language])
  }, [language])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dailyDuas.map((dua, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-emerald-800 mb-2">{t[dua.title as keyof typeof t]}</h2>
          <p className="text-2xl mb-2 text-right">{dua.arabic}</p>
          <p className="text-lg mb-2">{dua.transliteration}</p>
          <p className="text-gray-600">{dua.translation[language]}</p>
        </div>
      ))}
    </div>
  )
}

