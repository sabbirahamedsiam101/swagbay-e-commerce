import React from "react";
import { FiTruck } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";

function PromoBanner() {
  return (
    <section className="section__container banner__container">
      <div className="banner__card">
        <span>
          <FiTruck />
        </span>
        <h4>Free Delivery</h4>
        <p>
          Offers convenience and the ability to shop from anywhere, anytime.{" "}
        </p>
      </div>
      <div className="banner__card">
        <span>
          <RiMoneyDollarCircleLine />
        </span>
        <h4>Free Delivery</h4>
        <p>
          Offers convenience and the ability to shop from anywhere, anytime.{" "}
        </p>
      </div>
      <div className="banner__card">
        <span>
          <MdOutlineSupportAgent />
        </span>
        <h4>Free Delivery</h4>
        <p>
          Offers convenience and the ability to shop from anywhere, anytime.{" "}
        </p>
      </div>
    </section>
  );
}

export default PromoBanner;
