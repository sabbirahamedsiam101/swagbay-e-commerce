import React, { useState, useEffect } from "react";
import RatingStars from "../../../Components/RatingStars";

const defaultProduct = {
  _id: 2,
  name: "Evening Gown",
  category: "dress",
  description: "Elegant evening gown for special occasions.",
  price: 149.99,
  oldPrice: 199.99,
  images: [
    "https://images.unsplash.com/photo-1568251188392-ae32f898cb3b?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1631097969294-c38afba59496?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1485527691629-8e370684924c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  color: "red",
  rating: 4.0,
};

function ProductDetailsPage() {
  const [product, setProduct] = useState(defaultProduct);
  const [activeImage, setActiveImage] = useState(product.images[0]);

  // Simulate fetching from API
  useEffect(() => {
    // fetch('/api/product/2').then(res => res.json()).then(data => {
    //   setProduct(data);
    //   setActiveImage(data.images[0]);
    // });
  }, []);

  return (
    <section className="section__container">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="w-full">
          <div className="pb-4">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full md:h-[400px] h-[300px] object-cover rounded-xl"
            />
          </div>
          <div className="flex overflow-auto justify-center gap-4">
            {product.images.map((img, i) => (
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
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-center gap-4">
          <h2 className="text-3xl font-semibold ">{product.name}</h2>

          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-(--color-primary)">
              ${product.price}
            </span>
            {product.oldPrice && (
              <span className="line-through text-gray-400">
                ${product.oldPrice}
              </span>
            )}
          </div>

          <p className="description__text">{product.description}</p>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Color:</span>
            <span
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: product.color }}
            ></span>
          </div>

          {/* additional product info */}
          <div>
            <p>
              <strong>Category :</strong> accessories
            </p>
            <p>
              <strong>Color :</strong> beige
            </p>
            <div className="flex gap-1 items-center">
              <strong>Rating: </strong>
              <RatingStars rating={"4"} />
            </div>
          </div>

          <button className="bg-primary px-6 py-2 text-sm text-white rounded w-fit">
            Add to Cart
          </button>
        </div>
      </div>
      {/* review section */}
      <section className="section__container bg-gray-300 text-center mt-12">
        Review will here
      </section>
    </section>
  );
}

export default ProductDetailsPage;
