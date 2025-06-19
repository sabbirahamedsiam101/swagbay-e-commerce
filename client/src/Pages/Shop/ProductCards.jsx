import { Link } from "react-router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import RatingStars from "../../Components/RatingStars";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

function ProductCards({ products, isLoading, hasSidebar = false }) {
  const skeletonArray = new Array(8).fill(null); // 8 placeholders
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const gridColsClass = hasSidebar
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    //  <div
    //   className="grid gap-6"
    //   style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
    // ></div>
    <div className={`grid gap-6 ${gridColsClass}`}>
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
                <Link to={`/shop/${product._id}`}>
                  <img
                    src={product.image}
                    loading="lazy"
                    alt={product.name}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  />

                  {/* Discount Badge */}
                  {product.oldPrice && (
                    <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm z-10 transition-all duration-300 scale-95 group-hover:scale-100">
                      -
                      {Math.round(
                        ((product.oldPrice - product.price) /
                          product.oldPrice) *
                          100
                      )}
                      %
                    </span>
                  )}
                </Link>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="absolute top-2 left-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white p-2 rounded-lg z-10"
                >
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
