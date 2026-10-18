const buttonStyles = {
  base: "cursor-pointer rounded font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
  variants: {
    primary:
      "bg-primary text-on-primary transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    secondary:
      "border border-primary text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    tertiary:
      "border border-secondary text-secondary transition-colors hover:bg-secondary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
    danger:
      "border border-danger bg-danger text-on-primary transition-colors hover:bg-danger/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger",
  },
  sizes: {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  },
};

export default buttonStyles;
