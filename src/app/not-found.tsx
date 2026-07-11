import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-32 text-center">
        <div className="font-display text-7xl font-bold text-accent">404</div>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">This shelf is empty.</h1>
        <p className="mt-3 text-mute">The page you&apos;re looking for doesn&apos;t exist.</p>
        <div className="mt-8">
          <Button href="/">Back home</Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
