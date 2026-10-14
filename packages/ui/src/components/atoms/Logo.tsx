import type { ImgHTMLAttributes } from "react";
export interface LogoProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt"
> {
  src: string;
  alt: string;
}
/** Accepts CSP brand assets or a customer-owned logo. URLs stay the consumer's responsibility. */
export function Logo({
  className = "",
  width = 164,
  height = 48,
  ...props
}: LogoProps) {
  return (
    <img
      {...props}
      className={`csp-ui-logo logo ${className}`.trim()}
      width={width}
      height={height}
    />
  );
}
