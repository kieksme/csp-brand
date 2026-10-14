import {
  Activity,
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Check,
  Clock3,
  CodeXml,
  CornerDownRight,
  FileText,
  Hash,
  Infinity as InfinityIcon,
  Menu,
  MessagesSquare,
  Phone,
  Plus,
  Send,
  Users,
  type LucideProps,
} from "lucide-react";
const icons = {
  contact: Phone,
  signl4: Clock3,
  kuma: Activity,
  content: FileText,
  chat: MessagesSquare,
  teams: Users,
  slack: Hash,
  telegram: Send,
  module: Blocks,
  arrow: ArrowRight,
  "arrow-up-right": ArrowUpRight,
  "arrow-down-left": ArrowDownLeft,
  "arrow-left-right": ArrowLeftRight,
  "corner-down-right": CornerDownRight,
  check: Check,
  menu: Menu,
  plus: Plus,
  infinity: InfinityIcon,
  code: CodeXml,
};
export type IconName = keyof typeof icons;
export interface IconProps extends Omit<LucideProps, "name"> {
  name?: IconName;
  label?: string;
}
/** Decorative by default; provide label for an icon with its own meaning. */
export function Icon({
  name = "module",
  size = 24,
  label,
  className = "",
  ...props
}: IconProps) {
  const Symbol = icons[name];
  return (
    <Symbol
      {...props}
      className={`csp-ui-icon icon ${className}`.trim()}
      size={size}
      strokeWidth={1.6}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
    />
  );
}
