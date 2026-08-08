"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="border-border bg-background text-foreground hover:bg-muted inline-flex h-11 items-center justify-center gap-2 rounded-md border px-5 text-sm font-medium transition-colors"
    >
      <Printer className="size-4" aria-hidden />
      Print
    </button>
  );
}
