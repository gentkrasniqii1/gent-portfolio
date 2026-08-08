import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <Container as="main" className="py-section">
      <h1 className="text-4xl text-foreground">Contact</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl text-base">
        Contact form arrives in Phase 8.
      </p>
    </Container>
  );
}
