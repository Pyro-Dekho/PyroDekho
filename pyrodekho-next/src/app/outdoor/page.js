import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/lib/api";
import "@/styles/listing.css";

export const metadata = {
  title: "Outdoor Cold Pyro Products",
  description:
    "Outdoor cold pyro and spark effects for weddings, entries, concerts and events. Safe, smokeless and delivered all over India.",
};

async function OutdoorProducts() {
  const products = await getProductsByCategory("outdoor");
  return <ProductGrid products={products} emptyClassName="no-results" />;
}

export default function OutdoorPage() {
  return (
    <>
      <Header searchPlaceholder="Search outdoor pyro products..." />

      <div className="page-container">
        <h1 className="page-title">Outdoor Pyro Products</h1>

        <section className="listings">
          <Suspense fallback={<Loader />}>
            <OutdoorProducts />
          </Suspense>
        </section>
      </div>

      <Footer />
    </>
  );
}
