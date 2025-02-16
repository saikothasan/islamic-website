"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"

async function fetchNamesOfAllah() {
  const res = await fetch("https://api.aladhan.com/asmaAlHusna")
  const data = await res.json()
  return data.data
}

export function NamesOfAllahList() {
  const [names, setNames] = useState([])
  const { language } = useLanguage()

  useEffect(() => {
    fetchNamesOfAllah().then(setNames)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {names.map((name: any) => (
        <div key={name.number} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-emerald-800 mb-2">{name.name}</h2>
          <p className="text-lg mb-2">{name.transliteration}</p>
          <p className="text-gray-600">{language === "en" ? name.en.meaning : name.bn.meaning}</p>
        </div>
      ))}
    </div>
  )
}

