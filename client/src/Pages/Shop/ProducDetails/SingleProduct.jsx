import RatingStars from "../../../Components/RatingStars";
import { useParams } from "react-router";
import { useFetchProductByIdQuery } from "../../../redux/features/products/prodcutsApi.js";
import Loading from "../../../Components/Loading.jsx";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import ErrorMessage from "../../../Components/ErrorMessage.jsx";
import colorNameToRgba from "../../../utlis/colorNameToRgba.js";
import ProductReviews from "../../../Components/ProductReviews.jsx";

function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  // console.log("Product ID from URL:", id);

  const {
    data: { data: product, reviews } = {},
    isLoading,
    error,
  } = useFetchProductByIdQuery(id);

  if (isLoading) return <Loading />;
  if (error) {
    console.error("Error fetching product:", error);
    return <ErrorMessage message={error.message} />;
  }
  if (!product) {
    return <ErrorMessage message="Product not found" />;
  }
  console.log("Fetched product data:", product, "Reviews:", reviews);

  const { category, color, image, name, description, oldPrice, price, rating } =
    product;
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Single Product</h2>
        <p className="section__subheader">
          Home / Shop / {name} - {category}
        </p>
      </section>

      <section className="section__container">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="w-full">
            <div className="pb-4">
              <img
                src={image}
                alt={name}
                className="w-full md:h-[400px] h-[300px] object-cover rounded-xl"
              />
            </div>
            {/* <div className="flex overflow-auto justify-center gap-4">
            
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i + 1}`}
                onClick={() => setActiveImage(img)}
                className={`aspect-square lg:max-w-[100px] max-w-[70px] border-2 rounded-lg overflow-hidden flex-shrink-0 transition ${
                  img === activeImage
                    ? "border-(--color-primary)"
                    : "border-gray-300"
                }`}
              />

          </div> */}
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center gap-4">
            <h2 className="text-3xl font-semibold ">{name}</h2>

            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-(--color-primary)">
                ${price}
              </span>
              {oldPrice && (
                <span className="line-through text-gray-400">${oldPrice}</span>
              )}
            </div>

            <p className="description__text">{description}</p>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Color:</span>
              <span
                className="w-6 h-6 rounded-full border-4 border-red-300"
                style={{
                  backgroundColor: color,
                  borderColor: colorNameToRgba(color, 0.2),
                  boxShadow: `0 0 5px ${colorNameToRgba(color, 0.5)}`,
                }}
              ></span>
            </div>

            {/* additional product info */}
            <div>
              <p>
                <strong>Category :</strong> {category}
              </p>
              <p>
                <strong>Color :</strong> {color}
              </p>
              <div className="flex gap-1 items-center">
                <strong>Rating: </strong>
                <RatingStars rating={"4"} />
              </div>
            </div>

            <button
              onClick={() => handleAddToCart(product)}
              className="bg-primary px-6 py-2 text-sm text-white rounded w-fit"
            >
              Add to Cart
            </button>
          </div>
        </div>
        {/* review section */}
        {/* <section className="section__container bg-gray-300 text-center mt-12">
          Review will here
        </section> */}
        {/* Review section */}
        <ProductReviews productId={id} />
      </section>
    </>
  );
}

export default SingleProduct;
