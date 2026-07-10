import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";

export function ComingSoonCard({ name }: { name: string }) {
  return (
    <GlassCard className="flex aspect-[4/5] flex-col items-center justify-center gap-3 p-6 text-center">
      <Badge>Coming Soon</Badge>
      <p className="font-display text-lg text-white/80">{name}</p>
    </GlassCard>
  );
}
