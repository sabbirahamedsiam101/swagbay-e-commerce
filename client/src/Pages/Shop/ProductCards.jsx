import React from "react";
import { Link } from "react-router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import RatingStars from "../../Components/RatingStars";

function ProductCards({ products, isLoading }) {
  const skeletonArray = new Array(8).fill(null); // 8 placeholders

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {isLoading
        ? skeletonArray.map((_, i) => (
            <div
              key={i}
              className="bg-(--color-extra-light) animate-pulse rounded p-4"
            >
              <div className="h-64 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))
        : products.map((product, index) => (
            <div key={index} className="product__card">
              <div className="relative group overflow-hidden rounded">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    loading="lazy"
                    alt={product.name}
                    className="max-h-96 md:h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
                  />
                </Link>

                <button className="absolute top-2 right-2 bg-(--color-primary) hover:bg-(--color-primary-dark) text-white p-2 rounded-lg z-10">
                  <AiOutlineShoppingCart />
                </button>
              </div>

              <div className="product__card__content">
                <h4>{product.name}</h4>
                <p>
                  ${product.price}
                  {product.oldPrice && (
                    <s className="ml-2 text-gray-500">${product.oldPrice}</s>
                  )}
                </p>
                <RatingStars rating={product.rating} />
              </div>
            </div>
          ))}
    </div>
  );
}

export default ProductCards;
