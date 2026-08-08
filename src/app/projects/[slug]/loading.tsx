import { Container } from "@/components/layout/container";

export default function ProjectLoading() {
  return (
    <main className="py-section" aria-busy="true" aria-live="polite">
      <Container className="space-y-8">
        <div className="bg-muted h-4 w-32 animate-pulse rounded" />
        <div className="bg-muted h-12 w-2/3 max-w-xl animate-pulse rounded" />
        <div className="bg-muted h-6 w-full max-w-2xl animate-pulse rounded" />
        <div className="bg-muted aspect-[16/9] w-full animate-pulse rounded-lg" />
      </Container>
    </main>
  );
}
