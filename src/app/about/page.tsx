import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <Container as="main" className="py-section">
      <h1 className="text-4xl text-foreground">About</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl text-base">
        Content arrives in Phase 4.
      </p>
    </Container>
  );
}
