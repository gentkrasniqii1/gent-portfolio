import { Hero } from "@/components/hero/hero";
import { CareerSection } from "@/components/home/career-section";
import { CtaBand } from "@/components/home/cta-band";
import { HowIWork } from "@/components/home/how-i-work";
import { SkillsPreview } from "@/components/home/skills-preview";
import { StatsStrip } from "@/components/home/stats-strip";
import { FeaturedProjects } from "@/components/projects/featured-projects";
import { SITE_DESCRIPTION } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  path: "/",
  description: SITE_DESCRIPTION,
});

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <StatsStrip />
      <FeaturedProjects />
      <CareerSection />
      <SkillsPreview />
      <HowIWork />
      <CtaBand />
    </div>
  );
}
