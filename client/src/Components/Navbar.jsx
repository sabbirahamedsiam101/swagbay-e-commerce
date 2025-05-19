import React from "react";
import { Link } from "react-router";
import { LuSearch } from "react-icons/lu";
import { GrShop } from "react-icons/gr";
import { RiUserLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import CartModal from "../Pages/shop/CartModal";

function Navbar() {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const hanldeCartToggle = () => {
    // console.log(isCartOpen);
    setIsCartOpen(!isCartOpen);
  };
  // console.log("products", products);
  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2x1 mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/blogs">Blogs</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* logo  */}
        <div className="nav__logo">
          <Link to="/">
            SwagBay <span>.</span>
          </Link>
        </div>

        {/* nav icons */}
        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <LuSearch />
            </Link>
          </span>
          <span className="relative inline-block">
            <button
              onClick={hanldeCartToggle}
              className="text-xl text-(--color-text-dark) hover:text-(--color-primary)"
            >
              <GrShop />
              <sup className="absolute -top-2 -right-2 text-xs text-white bg-(--color-primary) rounded-full px-1.5 size-4 flex items-center justify-center">
                {products.length}
              </sup>
            </button>
          </span>
          <span>
            <Link to="/login">
              <button className="text-xl text-(--color-text-dark) hover:text-(--color-primary)">
                <RiUserLine />
              </button>
            </Link>
          </span>
        </div>
      </nav>

        {/* <div className={`fixed top-0 right-0 w-[400px] p-8 h-screen bg-gray-100 shadow-2xl z-10  duration-300 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
          <button onClick={hanldeCartToggle} className="absolute top-4 right-4 px-2.5  rounded-full bg-white text-xl shadow">x</button>
          cart
        </div> */}
        {/* cart modal */}
        <div><CartModal isOpen={isCartOpen} onClose={hanldeCartToggle} products={products} /></div>
   
    </header>
  );
}

export default Navbar;
