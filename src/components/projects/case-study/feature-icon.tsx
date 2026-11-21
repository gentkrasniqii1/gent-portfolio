import {
  CalendarClock,
  Camera,
  ClipboardList,
  Cookie,
  Globe,
  KeyRound,
  Languages,
  Layers,
  ListOrdered,
  MapPinned,
  MessagesSquare,
  Route,
  ShieldCheck,
  Sparkles,
  Tags,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ProjectFeatureIcon } from "@/types/project";

const ICONS: Record<ProjectFeatureIcon, LucideIcon> = {
  ai: Sparkles,
  auth: KeyRound,
  calendar: CalendarClock,
  chat: MessagesSquare,
  cookie: Cookie,
  form: ClipboardList,
  globe: Globe,
  languages: Languages,
  layers: Layers,
  map: MapPinned,
  pricing: Tags,
  route: Route,
  shield: ShieldCheck,
  timeline: ListOrdered,
  upload: Camera,
  users: Users,
};

export function FeatureIcon({
  icon,
  className,
}: {
  icon: ProjectFeatureIcon;
  className?: string;
}) {
  const Icon = ICONS[icon];
  return <Icon className={className} aria-hidden />;
}
