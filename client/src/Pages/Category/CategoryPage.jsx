import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import ProductCards from "../Shop/ProductCards";

const SkeletonLoader = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="animate-pulse bg-gray-300 h-[300px] rounded-lg" />
    ))}
  </div>
);

function CategoryPage() {
  const { categoryName } = useParams();

  const { data: filteredProducts, isLoading, isError, error } = useQuery({
    queryKey: ["products", categoryName],
    queryFn: async () => {
      const data = await import("../../data/products.json");
      return data.default.filter(
        (product) => product.category === categoryName.toLowerCase()
      );
    },
  });

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, from chic dresses to versatile
          accessories. Elevate your style today!
        </p>
      </section>

      <div className="section__container">
        {isLoading && <SkeletonLoader />}
        {isError && <div className="text-red-500">{error.message}</div>}
        {!isLoading && !isError && filteredProducts.length === 0 && (
          <div className="text-gray-600">No products found.</div>
        )}
        {!isLoading && !isError && filteredProducts.length > 0 && (
          <ProductCards products={filteredProducts} />
        )}
      </div>
    </>
  );
}

export default CategoryPage;
