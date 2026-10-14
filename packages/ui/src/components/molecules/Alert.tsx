import type { HTMLAttributes } from "react";
export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "info" | "success" | "warning" | "danger";
  title?: string;
}
export function Alert({
  tone = "info",
  title,
  children,
  className = "",
  role,
  ...props
}: AlertProps) {
  return (
    <div
      {...props}
      role={role ?? (tone === "danger" ? "alert" : "status")}
      className={`csp-ui-alert csp-ui-alert--${tone} ${className}`.trim()}
    >
      {title && <strong>{title}</strong>}
      {children}
    </div>
  );
}
