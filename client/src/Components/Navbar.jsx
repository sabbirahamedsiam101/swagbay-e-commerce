import React from "react";
import { Link } from "react-router";
import { LuSearch } from "react-icons/lu";
import { GrShop } from "react-icons/gr";
import { RiUserLine } from "react-icons/ri";
import { useSelector } from "react-redux";

function Navbar() {
  const products = useSelector((state) => state.cart.products);
  console.log("products", products);
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
            <button className="text-xl text-(--color-text-dark) hover:text-(--color-primary)">
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
    </header>
  );
}

export default Navbar;
