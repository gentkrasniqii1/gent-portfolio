import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

export function getSiteUrl() {
  return SITE_URL.replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function isPlaceholder(value: string | undefined) {
  return !value || value.startsWith("[YOUR");
}

export function getPersonName() {
  return profile.name;
}

export function getDefaultTitle() {
  return `${profile.name} — ${profile.role}`;
}

type CreateMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

/*
 * Share images come from the `opengraph-image` file conventions (the branded
 * site image at the root, a per-project one under /projects/[slug]). They take
 * priority over config metadata, so no image URLs are set here.
 */

export function createMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  noIndex = false,
}: CreateMetadataInput = {}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title ?? getDefaultTitle();

  const metadata: Metadata = {
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: path === "/" ? "website" : "article",
      locale: "en_US",
      url,
      siteName: profile.name,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };

  if (title) {
    metadata.title = title;
  }

  return metadata;
}

/** "Prizren, Kosovë" → locality "Prizren" (Kosovo's ISO code is XK). */
function getPostalAddress() {
  if (!profile.location || isPlaceholder(profile.location)) return undefined;
  const [locality] = profile.location.split(",").map((part) => part.trim());
  return {
    "@type": "PostalAddress",
    addressLocality: locality,
    addressCountry: "XK",
  };
}

export function getPersonJsonLd() {
  const sameAs = [profile.github, profile.linkedin].filter(
    (value) => !isPlaceholder(value),
  );

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${profile.name} — Portfolio`,
    url: absoluteUrl("/"),
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.shortRole,
      description: profile.summary,
      url: absoluteUrl("/"),
      image: absoluteUrl("/images/profile/gent-portrait.jpg"),
      email: isPlaceholder(profile.email) ? undefined : profile.email,
      address: getPostalAddress(),
      knowsAbout: profile.coreStack,
      knowsLanguage: profile.languages?.map((language) => language.name),
      sameAs: sameAs.length > 0 ? sameAs : undefined,
    },
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
