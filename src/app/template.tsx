"use client";

import type { ReactNode } from "react";
import { PageTransition } from "@/components/shared/motion";

export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
