import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import RatingStars from "../../Components/RatingStars";

function ProductCards({ products }) {
  const [loading, setLoading] = useState(true);
  console.log(products);
  console.log(loading);
  // Simulate loading complete when products are received
  useEffect(() => {
    if (products && products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  const skeletonArray = new Array(8).fill(null); // 8 placeholders

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {loading
        ? skeletonArray.map((_, i) => (
            <div
              key={i}
              className="bg-[--color-extra-light] animate-pulse rounded p-4"
            >
              <div className="h-64 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))
        : products.map((product, index) => (
            <div key={index} className="product__card">
              <div className="relative ">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    loading="lazy"
                    alt="product image"
                    className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300 rounded"
                  />
                </Link>
                <div>
                  <button className="absolute top-2 right-2 bg-(--color-primary) hover:bg-(--color-primary-dark) text-white p-2 rounded-lg">
                    <AiOutlineShoppingCart />
                  </button>
                </div>
              </div>
              {/* product description */}
              <div className="product__card__content">
                <h4>{product.name}</h4>
                <p>
                  ${product.price}{" "}
                  {product?.oldPrice ? <s>${product?.oldPrice}</s> : null}
                </p>
                <RatingStars rating={product.rating} />
              </div>
            </div>
          ))}
    </div>
  );
}

export default ProductCards;
