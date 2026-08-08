import type { Metadata } from "next";
import { CvActions } from "@/components/cv/cv-actions";
import { CvDocument } from "@/components/cv/cv-document";
import { Container } from "@/components/layout/container";
import { profile } from "@/data/profile";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "CV",
  description: `Curriculum vitae and resume download for ${profile.name}.`,
  path: "/cv",
});

export default function CvPage() {
  return (
    <main className="py-section">
      <Container className="space-y-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-3">
            <h1 className="text-display text-foreground">CV</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Download the PDF or print this page. Content is generated from the
              same typed data as the rest of the portfolio.
            </p>
            <p className="text-muted-foreground text-sm">
              Place your file at{" "}
              <code className="text-foreground font-mono text-xs">
                public{profile.cvPath}
              </code>
              .
            </p>
          </div>
          <CvActions />
        </div>

        <CvDocument />
      </Container>
    </main>
  );
}
