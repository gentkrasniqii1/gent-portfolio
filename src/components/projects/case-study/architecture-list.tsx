/** Stack and technical decisions as a simple connected flow. */
export function ArchitectureList({ items }: { items: string[] }) {
  return (
    <ol className="border-border relative space-y-5 border-l pl-6">
      {items.map((item) => (
        <li key={item} className="relative">
          <span
            aria-hidden
            className="border-background bg-primary absolute top-2 -left-[1.9rem] size-3 rounded-full border-2"
          />
          <p className="text-foreground/85 text-base leading-relaxed">{item}</p>
        </li>
      ))}
    </ol>
  );
}
