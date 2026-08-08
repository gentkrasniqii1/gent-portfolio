import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Container } from "@/components/layout/container";
import { SocialLinks } from "@/components/shared/social-links";
import { SOCIAL_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

const ContactForm = dynamic(
  () =>
    import("@/components/contact/contact-form").then(
      (module) => module.ContactForm,
    ),
  {
    loading: () => (
      <div
        className="space-y-4"
        aria-busy="true"
        aria-live="polite"
        aria-label="Loading contact form"
      >
        <div className="bg-muted h-11 animate-pulse rounded-md" />
        <div className="bg-muted h-11 animate-pulse rounded-md" />
        <div className="bg-muted h-11 animate-pulse rounded-md" />
        <div className="bg-muted h-32 animate-pulse rounded-md" />
        <div className="bg-muted h-11 w-40 animate-pulse rounded-md" />
      </div>
    ),
  },
);

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with [YOUR NAME] about freelance work, jobs, or collaboration.",
  path: "/contact",
});

function isPlaceholder(value: string) {
  return value.startsWith("[YOUR");
}

export default function ContactPage() {
  const email = isPlaceholder(SOCIAL_LINKS.email)
    ? undefined
    : SOCIAL_LINKS.email;

  return (
    <div className="py-section">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="space-y-6">
          <h1 className="text-display text-foreground">Contact</h1>
          <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
            Tell me about your project, role, or question. I usually reply
            within a few business days.
          </p>

          <div className="space-y-3 text-sm">
            {email ? (
              <p>
                <span className="text-muted-foreground">Email: </span>
                <a
                  href={`mailto:${email}`}
                  className="text-foreground hover:text-accent transition-colors"
                >
                  {email}
                </a>
              </p>
            ) : (
              <p className="text-muted-foreground">
                Direct email will appear here once contact details are set.
              </p>
            )}
            <SocialLinks />
          </div>
        </div>

        <div className="border-border rounded-lg border p-6 sm:p-8">
          <h2
            id="contact-form-heading"
            className="text-foreground mb-6 text-xl"
          >
            Send a message
          </h2>
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
