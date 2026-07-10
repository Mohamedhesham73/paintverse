import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center">
        <div className="font-display text-6xl font-bold text-purple">404</div>
        <h1 className="mt-4 text-3xl font-bold">This universe hasn&apos;t been painted yet.</h1>
        <p className="mt-3 text-white/60">The page you&apos;re looking for doesn&apos;t exist.</p>
        <div className="mt-8"><Button href="/">Back home</Button></div>
      </main>
      <Footer />
    </>
  );
}
