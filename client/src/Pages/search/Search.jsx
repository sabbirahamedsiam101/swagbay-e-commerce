import React, { useEffect, useMemo, useState } from "react";
import ProductCards from "../shop/ProductCards";
import productsData from "../../data/products.json";
function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim().toLowerCase());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    if (!debouncedQuery) return [];
    return productsData.filter(
      (product) =>
        product.name.toLowerCase().includes(debouncedQuery) ||
        product.description.toLowerCase().includes(debouncedQuery)
    );
  }, [debouncedQuery]);
  // const handleSearch = () => {
  //   const query = searchQuery.toLowerCase();
  //   const filtered = productsData.filter(
  //     (product) =>
  //       product.name.toLowerCase().includes(query) ||
  //       product.description.toLowerCase().includes(query)
  //   );

  //   setFilteredProducts(filtered);
  // };
  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Search</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, from chic dresses to versatile
          accessories. Elevate your style today!
        </p>
      </section>

      <section className="section__container">
        <div className="flex gap-1 mb-12 md:px-[12vw]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar w-full max-w-4x1 px-5 py-2 border rounded-full focus:outline-none focus:border-primary"
            placeholder="Search for products ... "
          />
        </div>
        {debouncedQuery ? (
          <>
            <h3 className="text-lg font-semibold mb-4">
              Showing results for:{" "}
              <span className="text-primary">{searchQuery}</span>
            </h3>
            {filteredProducts.length > 0 ? (
              <ProductCards products={filteredProducts} />
            ) : (
              <p className="text-center py-20">No products found.</p>
            )}
          </>
        ) : (
          <p className="text-center py-20">Fnd products to search</p>
        )}
      </section>
    </>
  );
}

export default Search;
