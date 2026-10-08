"use client";

import Slider from "@/components/HeroSlider";
import CardListing from "@/components/CardListing";
import { useSearch } from "@/context/SearchContext";

// "mostSearched" -> "Most Searched"
const formatCategory = (category) =>
  category
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

function HomeContent({ homeData }) {
  // Search text and selected category (both set in the Header)
  const { searchTerm, filters } = useSearch();

  // ===============================
  // FILTER DATA
  // ===============================

  // Hide the hero slider while the user is searching or filtering
  const isFiltering = searchTerm.trim() !== "" || filters.length > 0;

  const filteredData = {};

  Object.entries(homeData).forEach(([category, items]) => {
    // Make sure items is an array
    if (!Array.isArray(items)) return;

    // "mostSearched" -> "most searched"
    const categoryLabel = category
      .replace(/([A-Z])/g, " $1")
      .toLowerCase();
    const query = searchTerm.trim().toLowerCase();

    // Searching a category name (e.g. "most searched", "fog") shows the whole section
    const categoryMatchesSearch =
      query !== "" &&
      (categoryLabel.includes(query) ||
        category.toLowerCase().includes(query));

    const filteredItems = items.filter((item) => {
      // ===============================
      // SEARCH FILTER
      // ===============================

      const productName = item?.title || "";

      const matchesSearch =
        categoryMatchesSearch ||
        productName.toLowerCase().includes(query);

      // ===============================
      // CATEGORY FILTER
      // ===============================

      const matchesCategory =
        filters.length === 0 || filters.includes(category);

      return matchesSearch && matchesCategory;
    });

    // Add category only if products exist
    if (filteredItems.length > 0) {
      filteredData[category] = filteredItems;
    }
  });

  return (
    <>
      {/* HERO SLIDER */}
      {!isFiltering && <Slider />}

      {/* NO RESULTS */}
      {Object.keys(filteredData).length === 0 && (
        <p className="no-results">
          No products found 🔍
        </p>
      )}

      {/* PRODUCT SECTIONS */}
      {Object.entries(filteredData).map(([category, items]) => (
        <section key={category} className="home-section">
          <h2 className="section-title">{formatCategory(category)}</h2>

          <div className="listings">
            {items.map((product) => (
              <CardListing key={product._id} {...product} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

export default HomeContent;
