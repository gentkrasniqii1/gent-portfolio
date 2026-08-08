import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/layout/footer";
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
    profile.role,
    "Full-Stack Developer",
    "Portfolio",
    "Software Engineer",
  ],
  ...createMetadata({
    description: SITE_DESCRIPTION,
    path: "/",
  }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
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
          <JsonLd />
          <SkipToContent />
          <Navbar />
          <div id="main-content" className="flex flex-1 flex-col">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
