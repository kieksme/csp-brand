import type { HTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "../atoms/Icon.js";
export interface CardProps extends HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  icon?: IconName;
  children?: ReactNode;
}
export function Card({
  title,
  description,
  icon,
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <article {...props} className={`csp-ui-card ${className}`.trim()}>
      {icon && (
        <span className="csp-ui-card-icon">
          <Icon name={icon} />
        </span>
      )}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {children}
    </article>
  );
}
