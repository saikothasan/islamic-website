import type { Metadata } from "next"
import { constructMetadata } from "./metadata.config"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Headphones, Clock, Calculator, Compass, Calendar, Moon } from "lucide-react"
import Link from "next/link"
import { translations } from "@/lib/translations"

export const metadata: Metadata = constructMetadata({
  title: "Home",
  description: "Your comprehensive Islamic resource for Quran, Hadith, Prayer Times, and more",
})

const features = [
  {
    title: "quran",
    description: "Read and study the Holy Quran with translations and audio recitations",
    icon: Book,
    href: "/quran",
  },
  {
    title: "hadith",
    description: "Access verified collections of Hadith from trusted sources",
    icon: Book,
    href: "/hadith",
  },
  {
    title: "prayerTimes",
    description: "Get accurate prayer times based on your location",
    icon: Clock,
    href: "/prayer-times",
  },
  {
    title: "audioRecitations",
    description: "Listen to beautiful Quran recitations",
    icon: Headphones,
    href: "/audio",
  },
  {
    title: "tafsir",
    description: "Understand the deeper meanings of the Quran",
    icon: Book,
    href: "/tafsir",
  },
  {
    title: "namesOfAllah",
    description: "Learn about the beautiful names of Allah",
    icon: Book,
    href: "/names-of-allah",
  },
  {
    title: "dailyDuas",
    description: "Essential duas for daily life",
    icon: Book,
    href: "/duas",
  },
  {
    title: "zakat",
    description: "Calculate your Zakat easily",
    icon: Calculator,
    href: "/zakat",
  },
  {
    title: "qibla",
    description: "Find the Qibla direction from anywhere",
    icon: Compass,
    href: "/qibla",
  },
  {
    title: "islamicCalendar",
    description: "View the Islamic Hijri calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    title: "ramadan",
    description: "Everything you need to know about Ramadan",
    icon: Moon,
    href: "/ramadan",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Your Complete Islamic Resource
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Access the Holy Quran, Hadith collections, prayer times, and more. All in one place.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/quran">
                <Button size="lg">Read Quran</Button>
              </Link>
              <Link href="/prayer-times">
                <Button variant="outline" size="lg">
                  Prayer Times
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {features.map((feature) => (
              <Link key={feature.title} href={feature.href}>
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <feature.icon className="w-8 h-8 mb-2 text-primary" />
                    <CardTitle>{translations.en[feature.title]}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

