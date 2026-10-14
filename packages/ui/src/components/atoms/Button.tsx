import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { Icon } from "./Icon.js";
export type ButtonVariant = "primary" | "secondary" | "light" | "danger";
interface Shared {
  variant?: ButtonVariant;
  hasArrow?: boolean;
}
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, Shared {
  isLoading?: boolean;
  isDisabled?: boolean;
}
export function Button({
  variant = "primary",
  hasArrow = false,
  isLoading = false,
  isDisabled = false,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`csp-ui-button button button--${variant} ${className}`.trim()}
      disabled={isDisabled || isLoading || props.disabled}
      aria-busy={isLoading || undefined}
    >
      {children}
      {hasArrow && (
        <span aria-hidden="true">
          <Icon name="arrow-up-right" size={18} />
        </span>
      )}
    </button>
  );
}
export interface LinkButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>, Shared {
  href: string;
}
export function LinkButton({
  variant = "primary",
  hasArrow = true,
  className = "",
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a
      {...props}
      className={`csp-ui-button button button--${variant} ${className}`.trim()}
    >
      {children}
      {hasArrow && (
        <span aria-hidden="true">
          <Icon name="arrow-up-right" size={18} />
        </span>
      )}
    </a>
  );
}
