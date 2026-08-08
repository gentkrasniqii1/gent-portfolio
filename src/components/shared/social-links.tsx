import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/icons";
import { SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
};

function isPlaceholder(value: string) {
  return value.startsWith("[YOUR");
}

const items = [
  {
    key: "github" as const,
    label: "GitHub",
    icon: GitHubIcon,
    href: isPlaceholder(SOCIAL_LINKS.github) ? undefined : SOCIAL_LINKS.github,
  },
  {
    key: "linkedin" as const,
    label: "LinkedIn",
    icon: LinkedInIcon,
    href: isPlaceholder(SOCIAL_LINKS.linkedin)
      ? undefined
      : SOCIAL_LINKS.linkedin,
  },
  {
    key: "email" as const,
    label: "Email",
    icon: Mail,
    href: isPlaceholder(SOCIAL_LINKS.email)
      ? undefined
      : `mailto:${SOCIAL_LINKS.email}`,
  },
];

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {items.map(({ key, label, icon: Icon, href }) => (
        <li key={key}>
          {href ? (
            <a
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                href.startsWith("mailto:") ? undefined : "noopener noreferrer"
              }
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex size-10 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
              aria-label={label}
            >
              <Icon className="size-5" aria-hidden />
            </a>
          ) : (
            <span
              className="text-muted-foreground/50 inline-flex size-10 items-center justify-center rounded-md"
              title={`${label} — add your link in constants`}
              aria-label={`${label} (not configured)`}
            >
              <Icon className="size-5" aria-hidden />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
