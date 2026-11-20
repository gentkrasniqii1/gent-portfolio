import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SocialLinks } from "@/components/shared/social-links";
import { profile } from "@/data/profile";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border mt-auto border-t print:hidden">
      <Container className="flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="space-y-1">
          <p className="font-display text-foreground text-lg tracking-tight">
            {SITE_NAME}
          </p>
          <p className="text-muted-foreground text-sm">
            {profile.role}
            {profile.location ? ` · ${profile.location}` : null}
          </p>
        </div>

        <nav aria-label="Footer" className="-mx-3">
          <ul className="flex flex-wrap">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground inline-flex min-h-11 min-w-11 items-center justify-center px-3 text-sm transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-border border-t">
        <Container className="text-muted-foreground flex items-center justify-between gap-4 py-1 text-xs">
          <p>
            © {year} {SITE_NAME}
          </p>
          <SocialLinks className="-mr-3" />
        </Container>
      </div>
    </footer>
  );
}
