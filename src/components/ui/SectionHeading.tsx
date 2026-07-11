import { Badge } from "./Badge";

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
}: {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const wrap = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";
  return (
    <div className={wrap}>
      {label && <Badge>{label}</Badge>}
      <h2 className="mt-5 text-4xl font-bold text-balance sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-mute text-balance">{subtitle}</p>}
    </div>
  );
}
