import { FeaturedProjects } from "@/components/projects/featured-projects";
import { Hero } from "@/components/hero/hero";
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
      <FeaturedProjects />
    </div>
  );
}
