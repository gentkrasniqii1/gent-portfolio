import { FeaturedProjects } from "@/components/projects/featured-projects";
import { Hero } from "@/components/hero/hero";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <FeaturedProjects />
    </main>
  );
}
