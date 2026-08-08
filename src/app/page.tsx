export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-gutter py-section">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Full-Stack Developer
      </p>
      <h1 className="mt-3 text-center text-display text-foreground">
        [YOUR NAME]
      </h1>
      <p className="mt-4 max-w-md text-center text-base text-muted-foreground">
        Design system foundation is live. Layout and sections come next.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <span className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground shadow-sm">
          Primary
        </span>
        <span className="rounded-md bg-accent px-4 py-2 text-sm text-accent-foreground shadow-sm">
          Accent
        </span>
        <span className="rounded-md border border-border bg-secondary px-4 py-2 text-sm text-secondary-foreground">
          Secondary
        </span>
        <span className="rounded-md bg-muted px-4 py-2 text-sm text-muted-foreground">
          Muted
        </span>
      </div>
    </main>
  );
}
