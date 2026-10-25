import {
  Bot,
  BrainCircuit,
  CodeXml,
  FileText,
  GraduationCap,
  Headset,
  Megaphone,
  Sparkles,
  SquareTerminal,
  Workflow,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/lib/types";

const icons = {
  "brain-circuit": BrainCircuit,
  workflow: Workflow,
  sparkles: Sparkles,
  megaphone: Megaphone,
  code: CodeXml,
  headset: Headset,
  bot: Bot,
  "file-text": FileText,
  terminal: SquareTerminal,
  "graduation-cap": GraduationCap,
} satisfies Record<IconName, LucideIcon>;

type IconProps = LucideProps & { name: IconName };

/** Renders a content icon by key. Decorative by default. */
export function Icon({ name, ...props }: IconProps) {
  const Component = icons[name];
  return <Component aria-hidden strokeWidth={1.5} {...props} />;
}
