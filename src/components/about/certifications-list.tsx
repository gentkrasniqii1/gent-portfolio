import { CertificateCards } from "@/components/about/certificate-cards";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { certifications } from "@/data/certifications";

function formatCertDate(value: string) {
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime()) && value.includes("-")) {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      timeZone: "UTC",
    }).format(parsed);
  }
  return value;
}

export function CertificationsList() {
  return (
    <section aria-labelledby="certifications-heading" className="space-y-8">
      <Reveal>
        <SectionHeading
          id="certifications-heading"
          eyebrow="Certifications"
          title="Credentials"
          description="Courses and training I've completed."
        />
      </Reveal>

      {certifications.length === 0 ? (
        <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
          Certifications will appear here once added.
        </p>
      ) : (
        <CertificateCards
          certifications={certifications.map((cert) => ({
            ...cert,
            dateLabel: formatCertDate(cert.date),
          }))}
        />
      )}
    </section>
  );
}
