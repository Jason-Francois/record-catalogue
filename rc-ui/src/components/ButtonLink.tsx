import buttonStyles from "../styles/buttonStyles";
import { Link } from "react-router";
import type React from "react";
interface ButtonLinkProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  to: string;
}
export default function ButtonLink({
  children,
  variant,
  size,
  to,
}: ButtonLinkProps) {
  return (
    <Link
      className={`${buttonStyles.base} ${buttonStyles.variants[variant ?? "primary"]} ${buttonStyles.sizes[size ?? "medium"]}`}
      to={to}
    >
      {children}
    </Link>
  );
}
