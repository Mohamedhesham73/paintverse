export function GlassCard({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`glass rounded-2xl ${className}`}>{children}</div>;
}
