import { Container } from "@/components/layout/container";

export default function Loading() {
  return (
    <div className="py-section" aria-busy="true" aria-live="polite">
      <Container className="space-y-4">
        <div className="bg-muted h-4 w-28 animate-pulse rounded" />
        <div className="bg-muted h-10 w-2/3 max-w-md animate-pulse rounded" />
        <div className="bg-muted h-5 w-full max-w-xl animate-pulse rounded" />
      </Container>
    </div>
  );
}
