import type { DetailsHTMLAttributes, ReactNode } from "react";
import { Icon } from "../atoms/Icon.js";
export interface DisclosureProps extends DetailsHTMLAttributes<HTMLDetailsElement> {
  question: string;
  children: ReactNode;
}
export function Disclosure({
  question,
  children,
  className = "",
  ...props
}: DisclosureProps) {
  return (
    <details
      {...props}
      className={`csp-ui-disclosure faq-item ${className}`.trim()}
    >
      <summary>
        {question}
        <span aria-hidden="true">
          <Icon name="plus" size={20} />
        </span>
      </summary>
      <div className="csp-ui-disclosure-content">{children}</div>
    </details>
  );
}
