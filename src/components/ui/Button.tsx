import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost";
const styles: Record<Variant, string> = {
  primary: "bg-purple text-white hover:brightness-110",
  ghost: "glass text-white hover:bg-white/10",
};

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: { href?: string; variant?: Variant } & ComponentProps<"button">) {
  const cls = `inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition ${styles[variant]} ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
}
