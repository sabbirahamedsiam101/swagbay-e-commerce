import React, { useState } from "react";
import { Link } from "react-router";
import { LuSearch } from "react-icons/lu";
import { GrShop } from "react-icons/gr";
import { RiUserLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import CartModal from "../Pages/shop/CartModal";
import profileAvetar from "../assets/avatar.png";
function Navbar() {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const hanldeCartToggle = () => {
    // console.log(isCartOpen);
    setIsCartOpen(!isCartOpen);
  };

  // admin dropdown menus
  const adminDropDownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add New Post", path: "/dashboard/add-new-post" },
  ];

  // user dropdown menus
  const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const dropdownMenus =
    user?.role === "admin" ? [...adminDropDownMenus] : [...userDropDownMenus];
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
            {user ? (
              <img
                src={profileAvetar}
                alt=""
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <Link to="/login">
                <RiUserLine />
              </Link>
            )}
          </span>
        </div>
      </nav>
      {/* cart modal */}
      <div>
        <CartModal
          isOpen={isCartOpen}
          onClose={hanldeCartToggle}
          products={products}
        />
      </div>
    </header>
  );
}

export default Navbar;
