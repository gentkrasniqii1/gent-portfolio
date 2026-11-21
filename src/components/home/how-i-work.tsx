import { MessagesSquare, PenTool, Rocket, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger";
import { SectionHeading } from "@/components/shared/section-heading";
import { liveProductCount } from "@/data/stats";

type Principle = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const NUMBER_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six"];
const liveCount = NUMBER_WORDS[liveProductCount] ?? String(liveProductCount);

const principles: Principle[] = [
  {
    icon: PenTool,
    title: "Design-minded",
    body: "I care how a product looks and feels, not only that it works. Layout, spacing, motion and accessibility are part of the build, not a final polish pass.",
  },
  {
    icon: Rocket,
    title: "Ships to production",
    body: `${liveCount} of my projects are live. I take work past the demo: deployment, authentication, email and the edge cases real users run into.`,
  },
  {
    icon: MessagesSquare,
    title: "Communicates clearly",
    body: "I explain trade-offs in plain language, keep people updated and work comfortably in Albanian and English — habits built in sprints and stand-ups during my internship.",
  },
];

export function HowIWork() {
  return (
    <section
      aria-labelledby="how-i-work-heading"
      className="border-border py-section border-t"
    >
      <Container className="space-y-10">
        <Reveal>
          <SectionHeading
            id="how-i-work-heading"
            eyebrow="How I work"
            title="What you can expect from me"
          />
        </Reveal>

        <StaggerChildren as="ol" className="grid gap-4 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, body }, index) => (
            <StaggerItem
              key={title}
              as="li"
              className="border-border bg-card rounded-xl border p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="bg-accent/10 text-accent inline-flex size-10 items-center justify-center rounded-lg">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span
                  aria-hidden
                  className="text-muted-foreground/70 font-mono text-xs"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-foreground mt-5 text-2xl tracking-tight">
                {title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {body}
              </p>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
