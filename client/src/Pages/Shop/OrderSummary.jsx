import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";

function OrderSummary() {
  const products = useSelector((store) => store.cart.products);
  const dispatch = useDispatch();
  const { tax, taxRate, totalPrice, grandTotal, selectedItems } = useSelector(
    (store) => store.cart
  );
  // console.log({
  //   tax,
  //   taxRate,
  //   totalPrice,
  //   grandTotal,
  //   selectedItems,
  // });

  const handleClearCart = () => {
    console.log("clear cart");
    dispatch(clearCart());
  };
  return (
    <div className=" bg-primary-light mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-x1 Otext-text-dark">Order Summary</h2>
        <p className=" Otext-text-dark mt-2">SelectedItems: {selectedItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <p>
          Tax ({taxRate * 100}%): ${tax.toFixed(2)}
        </p>
        <h3 className="font-bold">GrandTotal: ${grandTotal.toFixed(2)}</h3>
        <div className=" mb-6">
          <button
            onClick={handleClearCart}
            className=" bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4"
          >
            Clear cart
          </button>
          <button className="bg-green-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4">
            Proceed Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
