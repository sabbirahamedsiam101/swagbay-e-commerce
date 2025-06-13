import { Link, NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaClipboardList,
  FaPenFancy,
  FaUser,
  FaMoneyCheckAlt,
  FaShoppingBag,
} from "react-icons/fa";
import useUserRole from "../../hooks/useUserRole";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/auth/authSlice";

const userLinks = [
  {
    label: "Dashboard",
    icon: <FaTachometerAlt />,
    path: "/dashboard",
    exact: true,
  },
  { label: "Profile", icon: <FaUser />, path: "/dashboard/profile" },
  { label: "Payments", icon: <FaMoneyCheckAlt />, path: "/dashboard/payments" },
  { label: "Orders", icon: <FaShoppingBag />, path: "/dashboard/orders" },
];

const adminLinks = [
  {
    label: "Admin Home",
    icon: <FaTachometerAlt />,
    path: "/dashboard/admin",
    exact: true,
  },
  {
    label: "Manage Products",
    icon: <FaBoxOpen />,
    path: "/dashboard/manage-products",
  },
  {
    label: "Manage Orders",
    icon: <FaClipboardList />,
    path: "/dashboard/manage-orders",
  },
  {
    label: "Add New Post",
    icon: <FaPenFancy />,
    path: "/dashboard/add-new-post",
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [showUser, setShowUser] = useState(true);
  const [showAdmin, setShowAdmin] = useState(true);
  const { isAdmin, role } = useUserRole();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logout().unwrap();
      console.log(res);
      dispatch(logoutUser());
      navigate("/login");
      setIsDropdownOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const linkClass =
    "flex items-center gap-2 px-4 py-2 rounded-lg mb-2 transition-all duration-200 hover:bg-primary/10 hover:text-primary";
  const activeClass = "bg-primary/10 text-primary font-semibold";
  console.log(sidebarOpen);
  return (
    <>
      {/* Overlay for small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/10 bg-opacity-30 z-40 lg:hidden "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`
          fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-lg 
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:shadow-none
        `}
      >
        {/* Close button for small screens */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setSidebarOpen(false)} className="text-xl">
            ✕
          </button>
        </div>

        {/* Logo */}
        <div className="nav__logo p-6 border-b border-gray-100 text-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            SwagBay<span className="text-pink-500">.</span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="mt-6 px-4 space-y-4 text-sm text-gray-800">
          {/* User Panel */}
          {role === "user" && (
            <div>
              <button
                onClick={() => setShowUser(!showUser)}
                className="flex items-center justify-between w-full text-left text-xs uppercase text-gray-500 mb-1 font-semibold"
              >
                User Panel {showUser ? <FaAngleUp /> : <FaAngleDown />}
              </button>
              {showUser &&
                userLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      `${linkClass} ${isActive ? activeClass : ""}`
                    }
                  >
                    {item.icon} {item.label}
                  </NavLink>
                ))}
            </div>
          )}

          {/* Admin Panel */}
          {role === "admin" && (
            <div>
              <button
                onClick={() => setShowAdmin(!showAdmin)}
                className="flex items-center justify-between w-full text-left text-xs uppercase text-gray-500 mb-1 font-semibold"
              >
                Admin Panel {showAdmin ? <FaAngleUp /> : <FaAngleDown />}
              </button>
              {showAdmin &&
                adminLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      `${linkClass} ${isActive ? activeClass : ""}`
                    }
                  >
                    {item.icon} {item.label}
                  </NavLink>
                ))}
            </div>
          )}
        </div>

        {/* Logout link (optional) */}
        <div className="px-4 mt-4 ">
          <button
            onClick={handleLogout}
            className="block px-4 py-2 rounded text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
