import { Container } from "@/components/layout/container";

export default function Home() {
  return (
    <Container
      as="main"
      className="flex flex-1 flex-col justify-center py-section"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Full-Stack Developer
      </p>
      <h1 className="mt-3 text-display text-foreground">[YOUR NAME]</h1>
      <p className="mt-4 max-w-lg text-base text-muted-foreground">
        Site shell is ready. Hero and content sections land in the next phases.
      </p>
    </Container>
  );
}
