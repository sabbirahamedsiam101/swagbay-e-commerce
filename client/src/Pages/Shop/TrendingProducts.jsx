import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCards from "./ProductCards";

function TrendingProducts() {
  const [visibleCount, setVisibleCount] = useState(8);

  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await import("../../data/products.json");
      return data.default;
    },
    staleTime: 1000 * 60 * 5, // optional: cache for 5 mins
  });

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
      {isError && <div className="text-red-500">Error: {error.message}</div>}

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
