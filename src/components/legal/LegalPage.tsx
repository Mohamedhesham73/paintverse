import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-white/40">Last updated: {updated}</p>
        <div className="prose-legal mt-8 space-y-6 text-white/70 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_a]:text-purple-300 [&_a]:underline">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
