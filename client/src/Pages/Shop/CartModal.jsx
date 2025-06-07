import React from "react";
import OrderSummary from "./OrderSummary";
import { useDispatch } from "react-redux";
import {
  removeItem,
  updateQuentity,
} from "../../redux/features/cart/cartSlice";

function CartModal({ isOpen, onClose, products }) {
  // console.log(isOpen);
  const dispatch = useDispatch();
  const handleQuantity = (type, id) => {
    const payload = { type, id };
    dispatch(updateQuentity(payload));
  };
  const handleRemoveitem = (id) => {
    // console.log("remove");
    dispatch(removeItem(id));
  };


  return (
    <div
      className={`fixed top-0 z-50 right-0 w-[500px] p-8 h-screen overflow-y-auto bg-gray-100 shadow-2xl duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* <button
        onClick={onClose}
        className="absolute top-4 right-4 px-2.5  rounded-full bg-white text-xl shadow"
      >
        x
      </button> */}
      <div className="p-4 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-x1 font-semibold">Your Cart</h4>
          <button
            onClick={onClose}
            className="Otext-gray-600 px-2.5  rounded-full bg-white text-xl shadow hover: text-gray-900"
          >
            x
          </button>
        </div>

        {/* card details */}
        <div className="cart-items">
          {products?.length == 0 ? (
            <div className="text-gray-600 py-6">No products in the cart</div>
          ) : (
            <div>
              {products.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between shadow-md rounded-md md:p-5 p-2 mb-5"
                >
                  {/* Left Section */}
                  <div className="flex items-center gap-4 flex-1">
                    <span className="px-2 bg-primary text-white rounded-full">
                      0{index + 1}
                    </span>
                    <img
                      src={product.image}
                      alt=""
                      className="max-w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <h5>{product.name}</h5>
                      <p>${Number(product.price).toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col items-end mt-2 md:mt-0">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantity("decrement", product._id)}
                        className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 hover:bg-primary text-white"
                      >
                        -
                      </button>
                      <span className="px-2 text-center mx-1">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantity("increment", product._id)}
                        className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 hover:bg-primary text-white"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveitem(product._id)}
                      className="mt-2"
                    >
                      <span className="text-red-600">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* cart calculation */}
        {products.length > 0 && <OrderSummary />}
      </div>
    </div>
  );
}

export default CartModal;
