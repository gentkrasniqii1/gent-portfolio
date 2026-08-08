import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/shared/button-link";

export const metadata: Metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col justify-center py-section">
      <Container className="max-w-xl space-y-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          404
        </p>
        <h1 className="text-display text-foreground">Page not found</h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          The page you requested does not exist or the project slug is invalid.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            View projects
          </ButtonLink>
        </div>
        <p className="text-muted-foreground text-sm">
          Or{" "}
          <Link
            href="/contact"
            className="text-foreground underline-offset-4 hover:underline"
          >
            contact me
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
