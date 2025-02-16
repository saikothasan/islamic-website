import { translations } from "@/lib/translations"

export const siteConfig = {
  name: "IslamicHub",
  description: {
    en: "Your comprehensive Islamic resource for Quran, Hadith, Prayer Times, and more",
    bn: "কুরআন, হাদিস, নামাজের সময় এবং আরও অনেক কিছুর জন্য আপনার সম্পূর্ণ ইসলামিক রিসোর্স",
  },
  url: "https://islamichub.vercel.app",
  ogImage: "https://islamichub.vercel.app/og.png",
  links: {
    twitter: "https://twitter.com/islamichub",
    github: "https://github.com/islamichub",
  },
}

export type MetadataProps = {
  title?: string
  description?: string
  image?: string
  path?: string
  language?: "en" | "bn"
}

export function constructMetadata({ title, description, image, path = "", language = "en" }: MetadataProps = {}) {
  const t = translations[language]
  return {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description[language],
    openGraph: {
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description: description || siteConfig.description[language],
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: language === "en" ? "en_US" : "bn_BD",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description: description || siteConfig.description[language],
      images: [image || siteConfig.ogImage],
      creator: "@islamichub",
    },
    alternates: {
      canonical: `${siteConfig.url}${path}`,
      languages: {
        "en-US": `${siteConfig.url}/en${path}`,
        "bn-BD": `${siteConfig.url}/bn${path}`,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    metadataBase: new URL(siteConfig.url),
  }
}

