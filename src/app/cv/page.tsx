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
    <div className="py-section">
      <Container className="space-y-10">
        <div className="flex flex-col gap-6 print:hidden sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl space-y-3">
            <h1 className="text-display text-foreground">CV</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Printable resume view. Download the PDF for a shareable file, or
              print this page directly.
            </p>
          </div>
          <CvActions />
        </div>

        <CvDocument />
      </Container>
    </div>
  );
}
