import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getTemplateData } from "../lib/data/backend";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"], display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const data = await getTemplateData();
  const siteName = data.siteInfo?.siteName || "NOL Ticket";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nol.gamigear.com";
  const description = data.siteInfo?.footerNotice || "Template frontend Next.js cho trải nghiệm đặt vé, sự kiện và thương mại.";
  const faviconUrl = data.siteInfo?.faviconUrl;

  return {
    metadataBase: new URL(siteUrl),
    applicationName: siteName,
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    alternates: {
      canonical: "/",
    },
    icons: faviconUrl ? { icon: faviconUrl, shortcut: faviconUrl, apple: faviconUrl } : undefined,
    openGraph: {
      title: siteName,
      description,
      url: siteUrl,
      siteName,
      locale: "vi_VN",
      type: "website",
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const data = await getTemplateData();
  const faviconUrl = data.siteInfo?.faviconUrl;
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="format-detection" content="telephone=no" />
        {faviconUrl ? <link rel="icon" href={faviconUrl} /> : null}
        <link rel="preconnect" href="https://ticketimage.interpark.com" crossOrigin="" />
        <link rel="preconnect" href="https://common-media.interparkcdn.net" crossOrigin="" />
        <link rel="preconnect" href="https://openimage.interpark.com" crossOrigin="" />
        <link rel="preconnect" href="https://media.interparkcdn.net" crossOrigin="" />
      </head>
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
