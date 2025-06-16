import React, { useState, useMemo } from "react";

import ProductCards from "./ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/prodcutsApi";

function TrendingProducts() {
  const [visibleCount, setVisibleCount] = useState(8);

  // Fetch featured products only
  const {
     data: { products = [], totalPages, totalProducts } = {},
    isLoading,
    isError,
    error,
  } = useFetchAllProductsQuery({
    isFeatured: true,
    limit: 100, 
    sortBy: "newest",
    category: "all",
    color: "all",
  });
  console.log("Products:", products);

  // Slice products to show limited amount with Load More
  const visibleProducts = useMemo(() => {
    return products.slice(0, visibleCount);
  }, [products, visibleCount]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader pb-12">
        Discover the Hottest Picks: Elevate Your Style with Our Curated
        Collection of Trending Women's Fashion Products.
      </p>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-300 rounded" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && <div className="text-red-500">Error: {error?.data?.message || "Something went wrong"}</div>}

      {/* Product Cards */}
      {!isLoading && !isError && (
        <>
          <ProductCards products={visibleProducts} isLoading={isLoading} />

          {visibleCount < products.length && (
            <div className="product__btn pt-5">
              <button className="btn" onClick={loadMore}>
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default TrendingProducts;
