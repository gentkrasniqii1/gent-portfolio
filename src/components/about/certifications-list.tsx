import { CertificationItem } from "@/components/about/certification-item";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/motion";
import { certifications } from "@/data/certifications";

function formatCertDate(value: string) {
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime()) && value.includes("-")) {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
    }).format(parsed);
  }
  return value;
}

export function CertificationsList() {
  return (
    <Reveal>
      <section aria-labelledby="certifications-heading" className="space-y-8">
        <SectionHeading
          id="certifications-heading"
          eyebrow="Certifications"
          title="Credentials"
          description="Professional certifications and verified credentials."
        />

        {certifications.length === 0 ? (
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
            Certifications will appear here once added.
          </p>
        ) : (
          <ol className="border-border max-w-2xl space-y-0 border-l pl-6">
            {certifications.map((cert) => (
              <CertificationItem
                key={cert.id}
                certification={cert}
                dateLabel={formatCertDate(cert.date)}
              />
            ))}
          </ol>
        )}
      </section>
    </Reveal>
  );
}
