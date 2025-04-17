// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import {
  ShoppingBagIcon,
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ onCartClick, loggedUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setCount(loggedUser.cart?.length || 0);
  }, [loggedUser.cart?.length]);

  if (!userId) return null;

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ? "underline font-semibold" : "hover:underline";

  return (
    <nav className="bg-black text-white px-6 py-7 w-full z-50 sticky top-0 border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* Left icons */}
        <div className="flex items-center gap-4">
          <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer hover:text-gray-400" />
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-3xl font-bold tracking-widest">
            KRACKED<span className="text-sm align-super">®</span>
          </h1>
          <div className="hidden md:flex justify-center space-x-6 mt-1 text-sm">
            <Link to="/" className={isActive("/")}>Home</Link>
            <Link to="/products" className={isActive("/products")}>Shop</Link>
            <Link to="/contact" className={isActive("/contact")}>Contact</Link>
          </div>
        </div>

        {/* Right icons */}
        <div className="hidden md:flex items-center gap-4 relative">
          <div className="relative">
            <UserIcon
              className="h-6 w-6 cursor-pointer hover:text-gray-400"
              onClick={() => setProfileOpen(!profileOpen)}
            />
            {profileOpen && (
              <div className="absolute right-0 top-8 bg-white text-black rounded shadow-md w-40 text-sm z-10">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full px-4 py-2 hover:bg-gray-100 text-left"
                >
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 hover:bg-gray-100 text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <ShoppingBagIcon
              className="h-6 w-6 cursor-pointer hover:text-gray-400"
              onClick={onCartClick}
            />
            <span className="absolute -top-2 -right-2 bg-white text-black text-xs px-1.5 py-0.5 rounded-full">
              {count}
            </span>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {mobileMenuOpen && (
            <div className="absolute right-0 mt-4 bg-white text-black rounded shadow-md w-48 text-sm z-20">
              <div className="flex flex-col py-2">
                <Link to="/" className="px-4 py-2 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/products" className="px-4 py-2 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
                <Link to="/contact" className="px-4 py-2 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/profile");
                  }}
                  className="px-4 py-2 hover:bg-gray-100 text-left"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="px-4 py-2 hover:bg-gray-100 text-left"
                >
                  Logout
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onCartClick();
                  }}
                  className="px-4 py-2 hover:bg-gray-100 text-left flex justify-between items-center"
                >
                  Cart <span className="ml-2 bg-gray-300 text-black text-xs px-2 rounded-full">{count}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;