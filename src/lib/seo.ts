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
  image?: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image,
  noIndex = false,
}: CreateMetadataInput = {}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl("/opengraph-image");
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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
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
      jobTitle: profile.role,
      description: profile.summary,
      url: absoluteUrl("/"),
      email: isPlaceholder(profile.email) ? undefined : profile.email,
      address: isPlaceholder(profile.location)
        ? undefined
        : {
            "@type": "PostalAddress",
            addressLocality: profile.location,
          },
      sameAs: sameAs.length > 0 ? sameAs : undefined,
    },
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
