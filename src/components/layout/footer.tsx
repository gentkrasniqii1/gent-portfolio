import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SocialLinks } from "@/components/shared/social-links";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border mt-auto border-t print:hidden">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-3">
          <p className="font-display text-foreground text-lg tracking-tight">
            {SITE_NAME}
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Full-Stack Developer portfolio — projects, skills, and contact.
          </p>
          <SocialLinks />
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground inline-flex min-h-11 items-center text-sm transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-border border-t">
        <Container className="text-muted-foreground flex flex-col gap-2 py-4 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p>Built with Next.js</p>
        </Container>
      </div>
    </footer>
  );
}
