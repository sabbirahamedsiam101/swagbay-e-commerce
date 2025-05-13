import React, { useState } from "react";
import ProductCards from "./ProductCards";
import products from "../../data/products.json";
function TrendingProducts() {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };
  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader pb-12">
        Discover the Hottest Picks: Elevate Your Style with Our Curated
        Collection of Trending Women's Fashion Products.
      </p>

      {/* product card */}
      <div>
        <ProductCards products={products.slice(0, visibleProducts)} />
      </div>

      {/* load more products btn */}
      <div className="product__btn pt-5">
        {visibleProducts < products.length && (
          <button className="btn" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
}

export default TrendingProducts;
