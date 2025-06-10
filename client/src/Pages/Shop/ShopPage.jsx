import React, { useState } from "react";
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/prodcutsApi";
import Loading from "../../Components/Loading";

const filters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  color: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
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
    color: "all",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  const { category, color, priceRange } = filterState;
  const [minPrice, maxPrice] = priceRange.split("-").map(Number);

  const {
    data: { data:products = [], totalPages, totalProducts } = {},
    isLoading,
    error,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });

  const clearFilters = () =>
    setFilterState({ category: "all", color: "all", priceRange: "" });

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading products: {error.message}</p>;
  console.log("Products fetched:", products);
  console.log("Filter state:", filterState);
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
              Products Available: {products.length}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Showing: {category}, {color},{" "}
              {priceRange || "Any Price"}
            </p>
            <ProductCards products={products} hasSidebar={true} />
          </div>
        </div>
      </section>
    </>
  );
}

export default ShopPage;
