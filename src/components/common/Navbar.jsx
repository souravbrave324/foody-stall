import React, { useState } from "react";
import { MessageCircle, Menu as MenuIcon, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getRestaurantStatus } from "../../utils/helpers";
import { useCart } from "../../context/CartContext";
import { contactInfo } from "../../data/contactInfo";
import Logo from "./Logo";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { status } = getRestaurantStatus();
  const { totalCount } = useCart();

  const openWhatsApp = () => {
    const phoneNumber = contactInfo.phoneRaw;
    const msg = "Hello Foody Stall! I have an enquiry regarding my visit.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Reservation", path: "/reservation" },
    { name: "Order", path: "/order", badge: totalCount > 0 ? totalCount : null },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 md:px-8">
      <div className="max-w-6xl mx-auto bg-slate-950/80 backdrop-blur-2xl border border-white/15 rounded-full px-6 py-3 shadow-2xl flex items-center justify-between transition-all duration-300">
        
        {/* Left: Brand Logo */}
        <NavLink to="/" className="flex items-center">
          <Logo />
        </NavLink>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-3 py-1 backdrop-blur-md">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-extrabold"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`
              }
            >
              {link.name}
              {link.badge && (
                <span className="bg-amber-400 text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {status}
          </div>

          {/* Enquiry Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openWhatsApp}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-400/25 transition-all cursor-pointer"
          >
            <MessageCircle size={15} />
            Enquiry
          </motion.button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            {mobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="md:hidden mt-3 max-w-6xl mx-auto bg-slate-950/95 border border-white/15 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl space-y-3"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-5 py-3 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-amber-400 text-slate-950 font-extrabold"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <div className="flex items-center justify-between">
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="bg-amber-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </div>
              </NavLink>
            ))}

            <button
              onClick={() => {
                openWhatsApp();
                setMobileOpen(false);
              }}
              className="w-full mt-3 py-3.5 rounded-2xl bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
            >
              <MessageCircle size={16} /> Instant WhatsApp Enquiry
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;