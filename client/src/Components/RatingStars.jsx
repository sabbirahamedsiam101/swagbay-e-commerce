import React from "react";
import { IoStar } from "react-icons/io5";

function RatingStars() {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span className="text-lg">
        <IoStar />
      </span>
    );
  }
  return <div className="product__rating flex items-center justify-center">{stars}</div>;
}
export default RatingStars;
