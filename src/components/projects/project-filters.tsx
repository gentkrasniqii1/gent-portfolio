import Link from "next/link";
import {
  getUsedCategories,
  isProjectCategory,
  PROJECT_CATEGORY_LABELS,
} from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types/project";

type ProjectFiltersProps = {
  active?: ProjectCategory;
};

export function ProjectFilters({ active }: ProjectFiltersProps) {
  const categories = getUsedCategories();

  if (categories.length === 0) return null;

  const filters: Array<{ label: string; href: string; isActive: boolean }> = [
    {
      label: "All",
      href: "/projects",
      isActive: !active,
    },
    ...categories.map((category) => ({
      label: PROJECT_CATEGORY_LABELS[category],
      href: `/projects?category=${category}`,
      isActive: active === category,
    })),
  ];

  return (
    <nav aria-label="Filter projects" className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Link
          key={filter.href}
          href={filter.href}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm transition-colors",
            filter.isActive
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-muted",
          )}
          aria-current={filter.isActive ? "page" : undefined}
        >
          {filter.label}
        </Link>
      ))}
    </nav>
  );
}

export function resolveCategoryParam(
  value: string | string[] | undefined,
): ProjectCategory | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !isProjectCategory(raw)) return undefined;
  return raw;
}
