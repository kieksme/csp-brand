import type { HTMLAttributes } from "react";
export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  src?: string;
  size?: number;
}
export function Avatar({
  name,
  src,
  size = 44,
  className = "",
  ...props
}: AvatarProps) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
  return (
    <span
      {...props}
      className={`csp-ui-avatar ${className}`.trim()}
      style={{ width: size, height: size, ...props.style }}
    >
      {src ? (
        <img src={src} alt={name} width={size} height={size} />
      ) : (
        <span role="img" aria-label={name}>
          {initials || "?"}
        </span>
      )}
    </span>
  );
}
