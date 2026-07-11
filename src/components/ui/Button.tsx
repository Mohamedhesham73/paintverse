import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "light" | "whatsapp";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 active:scale-[0.98]";

const styles: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-600 shadow-lg shadow-accent/20",
  ghost: "hairline text-white hover:bg-white/[0.06]",
  light: "bg-white text-ink hover:bg-white/90",
  whatsapp: "bg-[#25D366] text-black hover:brightness-105",
};

type Props = {
  href?: string;
  external?: boolean;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ href, external, variant = "primary", className = "", children, ...rest }: Props) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
