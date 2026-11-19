import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, Newsreader, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Navbar } from "@/components/navigation/navbar";
import { JsonLd } from "@/components/shared/json-ld";
import { SkipToContent } from "@/components/shared/skip-to-content";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { profile } from "@/data/profile";
import { SITE_DESCRIPTION } from "@/lib/constants";
import {
  absoluteUrl,
  createMetadata,
  getDefaultTitle,
  getSiteUrl,
} from "@/lib/seo";
import { THEME } from "@/lib/theme";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/** Analytics endpoints only exist on Vercel; elsewhere they 404 in the console. */
const IS_VERCEL = Boolean(process.env.VERCEL);

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: getDefaultTitle(),
    template: `%s · ${profile.name}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: absoluteUrl("/") }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Full-Stack Developer",
    "Frontend Developer",
    "Next.js",
    "React",
    "TypeScript",
    "NestJS",
    "Prizren",
    "Kosovë",
  ],
  ...createMetadata({
    description: SITE_DESCRIPTION,
    path: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${sourceSans.variable} ${newsreader.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute={THEME.attribute}
          defaultTheme={THEME.defaultTheme}
          enableSystem
          storageKey={THEME.storageKey}
          disableTransitionOnChange
        >
          <MotionProvider>
            <JsonLd />
            <SkipToContent />
            <Navbar />
            <main
              id="main-content"
              tabIndex={-1}
              className="flex flex-1 flex-col outline-none"
            >
              {children}
            </main>
            <Footer />
          </MotionProvider>
          {IS_VERCEL ? (
            <>
              <Analytics />
              <SpeedInsights />
            </>
          ) : null}
        </ThemeProvider>
      </body>
    </html>
  );
}
