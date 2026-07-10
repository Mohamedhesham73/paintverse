export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-purple/40 bg-purple/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-purple-300">
      {children}
    </span>
  );
}
