"use client";

import { Download, Printer } from "lucide-react";
import { profile } from "@/data/profile";

export function CvActions() {
  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <a
        href={profile.cvPath}
        download
        className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium shadow-sm transition-colors"
      >
        <Download className="size-4" aria-hidden />
        Download PDF
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="border-border bg-background text-foreground hover:bg-muted inline-flex h-11 items-center justify-center gap-2 rounded-md border px-5 text-sm font-medium transition-colors"
      >
        <Printer className="size-4" aria-hidden />
        Print
      </button>
    </div>
  );
}
