import type { HTMLAttributes } from "react";
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "accent" | "success" | "warning";
}
export function Badge({
  tone = "neutral",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={`csp-ui-badge badge badge--${tone} ${className}`.trim()}
    >
      {children}
    </span>
  );
}
