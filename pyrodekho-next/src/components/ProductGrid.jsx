"use client";

import CardListing from "./CardListing";
import { useSearch } from "@/context/SearchContext";

// Product cards filtered by the Header search box.
// Products come from the server, so they are already in the page HTML.
// searchEmptyText may contain {q}, replaced with the current search text.
function ProductGrid({
  products,
  emptyText = "No products found",
  searchEmptyText,
  emptyClassName = "notfound",
}) {
  const { searchTerm } = useSearch();

  const filteredProducts = products.filter((product) =>
    (product.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredProducts.length > 0) {
    return filteredProducts.map((product) => (
      <CardListing key={product._id} {...product} />
    ));
  }

  return (
    <p className={emptyClassName}>
      {searchTerm && searchEmptyText
        ? searchEmptyText.replace("{q}", searchTerm)
        : emptyText}
    </p>
  );
}

export default ProductGrid;
