import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Loader from "@/components/Loader";
import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Indoor Cold Pyro Products",
  description:
    "Indoor-safe cold pyro and spark fountains for weddings, stage shows and parties. No fire, no smoke. Delivered all over India.",
  path: "/indoor",
});

async function IndoorProducts() {
  const products = await getProductsByCategory("indoor");
  return <ProductGrid products={products} />;
}

export default function IndoorPage() {
  return (
    <>
      <Header searchPlaceholder="Search indoor pyro products..." />

      <div className="page-container">
        <h1 className="page-title">Indoor Pyro Products</h1>

        <section className="listings">
          <Suspense fallback={<Loader />}>
            <IndoorProducts />
          </Suspense>
        </section>

        <SeoContent category="indoor" />
      </div>

      <Footer />
    </>
  );
}
