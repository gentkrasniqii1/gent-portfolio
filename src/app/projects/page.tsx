import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <Container as="main" className="py-section">
      <h1 className="text-4xl text-foreground">Projects</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl text-base">
        Project archive arrives in Phase 6.
      </p>
    </Container>
  );
}
