import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Merriweather } from "next/font/google";
import "./globals.css";
import { BASE_URL } from '@/lib/utils';
import { Analytics } from "@vercel/analytics/next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1445" },
  ],
  width: "device-width",
  initialScale: 1,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-serif",
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // metadataBase resolves all relative image/URL paths in metadata
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Peak State Journal | Clinical & Data-Driven Longevity",
    template: "%s | Peak State Journal",
  },
  description:
    "A premium, scientific resource for high-income professionals. Explore peer-reviewed articles on longevity, preventive health, nutrigenomics, and executive performance.",

  // Canonical URL for the root and RSS feed alternates for search consoles
  alternates: {
    canonical: BASE_URL,
    types: {
      'application/rss+xml': [
        { url: `${BASE_URL}/feed.xml`, title: 'Peak State Journal RSS Feed' },
      ],
    },
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Peak State Journal",
    title: "Peak State Journal | Clinical & Data-Driven Longevity",
    description:
      "Peer-reviewed articles on longevity, preventive health, nutrigenomics, and executive performance.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Peak State Journal — Clinical Longevity Research",
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    site: "@peakstatejournal",
    creator: "@peakstatejournal",
    title: "Peak State Journal | Clinical & Data-Driven Longevity",
    description:
      "Peer-reviewed articles on longevity, preventive health, nutrigenomics, and executive performance.",
    images: ["/images/logo.png"],
  },

  // Robots directive
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification — add your actual Google Search Console token here
  // verification: {
  //   google: 'YOUR_GOOGLE_VERIFICATION_TOKEN',
  // },

  // Keywords (helpful for topic classification)
  keywords: [
    "longevity",
    "preventive health",
    "nutrigenomics",
    "intermittent fasting",
    "Zone 2 training",
    "gut microbiome",
    "biohacking",
    "executive health",
    "clinical research",
    "anti-aging",
    "lab tests",
    "blood work",
    "vitamins supplements",
    "sleep optimization",
    "hormones metabolism",
    "testosterone",
    "thyroid health",
    "insulin resistance",
    "VO2 max",
    "mitochondria",
    "cortisol stress",
    "circadian rhythm",
    "personalized medicine",
    "genetic testing",
  ],

  // Site identity for Google
  category: "health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning prevents false positives from browser
          extensions that inject attributes onto <body> (e.g. cz-shortcut-listen) */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
