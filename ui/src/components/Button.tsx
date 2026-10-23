import buttonStyles from "../styles/buttonStyles";

export type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSecondary?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "danger";
  fullSize?: boolean;
  className?: string;
};
export default function Button({
  children,
  type = "button",
  size = "medium",
  fullSize = false,
  className = "",
  onClick,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonStyles.base} ${buttonStyles.variants[variant ?? "primary"]} ${buttonStyles.sizes[size ?? "medium"]} ${fullSize ? "w-full" : ""} self-start ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
