import { ArrowUpRight } from "lucide-react";
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
              <li key={cert.id} className="relative pb-10 last:pb-0">
                <span
                  className="border-background bg-accent absolute top-1.5 -left-[1.625rem] size-2.5 rounded-full border-2"
                  aria-hidden
                />
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {formatCertDate(cert.date)}
                </p>
                <h3 className="text-foreground mt-2 text-xl">{cert.name}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {cert.issuer}
                  {cert.credentialId ? ` · ID ${cert.credentialId}` : null}
                </p>
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-accent mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-medium transition-colors"
                  >
                    View credential
                    <ArrowUpRight className="size-3.5" aria-hidden />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
        )}
      </section>
    </Reveal>
  );
}
