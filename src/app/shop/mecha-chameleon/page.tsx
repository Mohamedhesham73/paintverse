import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductDetail } from "@/components/product/ProductDetail";
import { getProduct } from "@/content/products";

export const metadata: Metadata = { title: "Mecha Chameleon" };

export default function MechaChameleonPage() {
  const product = getProduct("mecha-chameleon");
  if (!product) notFound();
  return (
    <>
      <Navbar />
      <main><ProductDetail product={product} /></main>
      <Footer />
    </>
  );
}
