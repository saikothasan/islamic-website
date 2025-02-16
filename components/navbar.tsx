"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { Book, Clock, Compass, Headphones } from "lucide-react"
import { Search } from "@/components/search"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"
import { translations, type TranslationKey } from "@/lib/translations"

const features = [
  {
    title: "quran",
    href: "/quran",
    description: "Read and study the Holy Quran with translations and audio.",
    icon: Book,
  },
  {
    title: "hadith",
    href: "/hadith",
    description: "Explore authentic collections of Hadith.",
    icon: Book,
  },
  {
    title: "prayerTimes",
    href: "/prayer-times",
    description: "Get accurate prayer times for your location.",
    icon: Clock,
  },
  {
    title: "qibla",
    href: "/qibla",
    description: "Find the Qibla direction from anywhere.",
    icon: Compass,
  },
  {
    title: "audioRecitations",
    href: "/audio",
    description: "Listen to beautiful Quran recitations.",
    icon: Headphones,
  },
]

const resources = [
  {
    title: "namesOfAllah",
    href: "/names-of-allah",
    description: "Learn about the 99 beautiful names of Allah.",
  },
  {
    title: "dailyDuas",
    href: "/duas",
    description: "Essential duas for daily life.",
  },
  {
    title: "zakat",
    href: "/zakat",
    description: "Calculate your Zakat easily.",
  },
  {
    title: "islamicCalendar",
    href: "/calendar",
    description: "View the Islamic Hijri calendar.",
  },
  {
    title: "ramadan",
    href: "/ramadan",
    description: "Learn about the holy month of Ramadan.",
  },
  {
    title: "tafsir",
    href: "/tafsir",
    description: "Explore Quranic exegesis and interpretations.",
  },
]

export function Navbar() {
  const pathname = usePathname()
  const { language } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">IslamicHub</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{translations[language].features}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {features.map((feature) => (
                    <ListItem
                      key={feature.title}
                      title={translations[language][feature.title as TranslationKey]}
                      href={feature.href}
                      className={cn(pathname === feature.href && "text-primary")}
                    >
                      {feature.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{translations[language].resources}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {resources.map((resource) => (
                    <ListItem
                      key={resource.title}
                      title={translations[language][resource.title as TranslationKey]}
                      href={resource.href}
                      className={cn(pathname === resource.href && "text-primary")}
                    >
                      {resource.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ModeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref as any}
            href={href ?? "#"}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

