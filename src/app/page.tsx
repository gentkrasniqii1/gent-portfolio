import { FeaturedProjects } from "@/components/projects/featured-projects";
import { Hero } from "@/components/hero/hero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  path: "/",
  description:
    "Portfolio of Gent Krasniqi, Frontend / Full Stack Developer — selected projects, skills, and contact.",
});

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <FeaturedProjects />
    </div>
  );
}
