import { Badge } from "./Badge";

export function SectionHeading({ label, title, subtitle }: { label?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {label && <Badge>{label}</Badge>}
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-white/60">{subtitle}</p>}
    </div>
  );
}
