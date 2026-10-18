import buttonStyles from "../styles/buttonStyles";

export type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSecondary?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "danger";
};
export default function Button({
  children,
  type = "button",
  size = "medium",
  onClick,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonStyles.base} ${buttonStyles.variants[variant ?? "primary"]} ${buttonStyles.sizes[size ?? "medium"]}`}
    >
      {children}
    </button>
  );
}
