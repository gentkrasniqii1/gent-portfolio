import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "CV",
};

export default function CvPage() {
  return (
    <Container as="main" className="py-section">
      <h1 className="text-4xl text-foreground">CV</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl text-base">
        Resume page arrives in Phase 9.
      </p>
    </Container>
  );
}
