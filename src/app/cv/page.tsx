import type { Metadata } from "next";
import { CvActions } from "@/components/cv/cv-actions";
import { CvDocument } from "@/components/cv/cv-document";
import { Container } from "@/components/layout/container";
import { profile } from "@/data/profile";
import { publicFileExists } from "@/lib/files";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "CV",
  description: `Curriculum vitae and resume download for ${profile.name}.`,
  path: "/cv",
});

export default async function CvPage() {
  const hasCvPdf = await publicFileExists(profile.cvPath);

  return (
    <div className="py-section">
      <Container className="space-y-8">
        <div className="flex flex-col gap-6 print:hidden sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-3">
            <h1 className="text-display text-foreground">CV</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Download the PDF or print this page. Content is generated from the
              same typed data as the rest of the portfolio.
            </p>
            {!hasCvPdf ? (
              <p className="text-muted-foreground text-sm">
                PDF download will be available once the CV file is added.
              </p>
            ) : null}
          </div>
          <CvActions />
        </div>

        <CvDocument />
      </Container>
    </div>
  );
}
