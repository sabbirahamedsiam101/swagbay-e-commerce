import React, { useState, useMemo } from "react";
import productsData from "../../data/products.json";
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";

const filters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

function ShopPage() {
  
  const [filterState, setFilterState] = useState({
    category: "all",
    colors: "all",
    priceRange: " ",
  });

  const clearFilters = () =>
    setFilterState({ category: "all", colors: "all", priceRange: " " });

  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    if (filterState.category !== "all") {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() === filterState.category.toLowerCase()
      );
    }

    if (filterState.colors !== "all") {
      result = result.filter((product) =>
        product.color.includes(filterState.colors.toLowerCase())
      );
    }

    if (filterState.priceRange && filterState.priceRange !== " ") {
      const [min, max] = filterState.priceRange.split("-").map(Number);
      result = result.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    return result;
  }, [filterState]);

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Shop</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, from chic dresses to versatile
          accessories. Elevate your style today!
        </p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* Sidebar Filtering */}
          <ShopFiltering
            filters={filters}
            filtersState={filterState}
            setFiltersState={setFilterState}
            clearFilters={clearFilters}
          />

          {/* Product Area */}
          <div className="flex-1">
            <h3 className="text-xl font-medium mb-2">
              Products Available: {filteredProducts.length}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Showing: {filterState.category}, {filterState.colors},{" "}
              {filterState.priceRange || "Any Price"}
            </p>
            <ProductCards products={filteredProducts} hasSidebar={true} />
          </div>
        </div>
      </section>
    </>
  );
}

export default ShopPage;
