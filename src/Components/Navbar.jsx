import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { User, ShoppingBag, Menu, X, ChevronRight, LogOut, Package } from "lucide-react";

const Navbar = () => {

  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { getCartCount } = useContext(ShopContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setCartBounce(true);
    const timer = setTimeout(() => setCartBounce(false), 300);
    return () => clearTimeout(timer);
  }, [getCartCount()]);

  useEffect(() => {
    setVisible(false);
    setProfileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [visible]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/collection", label: "Collection" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] py-3"
            : "bg-white py-5"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <Link to="/" className="relative group">
              <img
                src={assets.logo}
                alt="Logo"
                className="w-36 sm:w-40 transition-all duration-500 group-hover:scale-105"
              />
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <NavLink key={link.path} to={link.path} className="relative group py-2">
                  <span
                    className={`text-[15px] font-semibold tracking-wide uppercase transition-all duration-300 ${
                      isActivePath(link.path)
                        ? "text-gray-900"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                  </span>

                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-gray-900 transition-all duration-300 ${
                      isActivePath(link.path) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </NavLink>
              ))}
            </div>

            {/* RIGHT SIDE ICONS */}
            <div className="flex items-center gap-3">

              {/* PROFILE */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${
                    profileOpen
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <User className="w-[22px] h-[22px]" />
                </button>

                {profileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileOpen(false)}
                    />

                    <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl shadow-lg border py-2 z-50">

                      <Link
                        to="/login"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50"
                      >
                        <User className="w-[18px] h-[18px]" />
                        Sign In
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50"
                      >
                        <Package className="w-[18px] h-[18px]" />
                        My Orders
                      </Link>

                      <button
                        onClick={() => setProfileOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-[18px] h-[18px]" />
                        Logout
                      </button>

                    </div>
                  </>
                )}
              </div>

              {/* CART */}
              <Link
                to="/cart"
                className="relative flex items-center justify-center w-11 h-11 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <ShoppingBag
                  className={`w-[22px] h-[22px] transition-all duration-300 ${
                    cartBounce ? "scale-125" : ""
                  }`}
                />

                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center text-[11px] font-bold text-white bg-gray-900 rounded-full">
                    {getCartCount()}
                  </span>
                )}
              </Link>

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setVisible(true)}
                className="flex lg:hidden items-center justify-center w-11 h-11 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${
          visible ? "visible" : "invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setVisible(false)}
        />

        <div
          className={`absolute top-0 right-0 h-full w-[320px] bg-white shadow-2xl transform transition-transform duration-500 ${
            visible ? "translate-x-0" : "translate-x-full"
          }`}
        >

          <div className="flex items-center justify-between p-6 border-b">
            <span className="text-xl font-bold">Menu</span>
            <button onClick={() => setVisible(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* LOGIN BUTTON MOBILE */}
          <Link
            to="/login"
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 mx-4 mt-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-gray-50"
          >
            <User className="w-5 h-5"/>
            Login / Sign Up
          </Link>

          <div className="py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setVisible(false)}
                className="flex items-center justify-between mx-4 px-4 py-4 rounded-xl text-lg font-semibold text-gray-700 hover:bg-gray-50"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-5 h-5" />
              </NavLink>
            ))}
          </div>

        </div>
      </div>

      <div className={`${scrolled ? "h-[60px]" : "h-[76px]"}`} />
    </>
  );
};

export default Navbar;