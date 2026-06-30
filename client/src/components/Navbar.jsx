import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTools,
  FaBars,
  FaTimes,
  FaPhoneAlt,
  FaEnvelope,
  FaYoutube,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home and then scroll
      navigate(`/#${sectionId}`);
    }
  };
  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "glass-nav py-3 shadow-md" : "bg-transparent py-5"
        }`}
      >
        {/* Mobile Top Contact Bar */}
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1 text-xs font-medium text-black"
            >
              <FaPhoneAlt className="text-primary-600 text-sm" />
              <span>+91 98765 43210</span>
            </a>

            <a
              href="mailto:hydradynamic132@gmail.com"
              className="flex items-center gap-1 text-xs font-medium text-black"
            >
              <FaEnvelope className="text-primary-600 text-sm" />
              <span>hydradynamic132@gmail.com</span>
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="bg-primary-600 text-white p-2 rounded-lg mr-2 shadow-md">
                <FaTools className="text-lg" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-dark-900">
                Servi<span className="text-primary-600">co</span>
              </span>
            </div>
            {/* Desktop Nav Links */}
            <div className="hidden md:flex space-x-8 items-center">
              <button
                onClick={() => handleNavClick("hero")}
                className="text-dark-600 hover:text-primary-600 font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick("services")}
                className="text-dark-600 hover:text-primary-600 font-medium transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => handleNavClick("contact")}
                className="text-dark-600 hover:text-primary-600 font-medium transition-colors"
              >
                Contact
              </button>
            </div>
            {/* Contact Info + CTA */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Phone */}
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-dark-700 hover:text-primary-600 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
                  <FaPhoneAlt className="text-primary-600 text-sm" />
                </div>
                <span className="font-medium text-sm">+91 98765 43210</span>
              </a>

              {/* Email */}
              <a
                href="mailto:hydradynamic132@gmail.com"
                className="flex items-center gap-2 text-dark-700 hover:text-primary-600 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
                  <FaEnvelope className="text-primary-600 text-sm" />
                </div>
                <span className="font-medium text-sm">
                  hydradynamic132@gmail.com
                </span>
              </a>

              {/* Button */}
              <button
                onClick={() => handleNavClick("booking")}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Book Service
              </button>
            </div>
            {/* Mobile Menu Button */}

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-dark-600 hover:text-primary-600 focus:outline-none p-2"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Drawer menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 py-4 px-6 space-y-4 flex flex-col items-start transition-all duration-300">
            <button
              onClick={() => handleNavClick("hero")}
              className="w-full text-left text-dark-600 hover:text-primary-600 font-medium py-2 transition-colors border-b border-slate-100"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick("services")}
              className="w-full text-left text-dark-600 hover:text-primary-600 font-medium py-2 transition-colors border-b border-slate-100"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="w-full text-left text-dark-600 hover:text-primary-600 font-medium py-2 transition-colors border-b border-slate-100"
            >
              Contact
            </button>

            <button
              onClick={() => handleNavClick("booking")}
              className="w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-full transition-all shadow-md"
            >
              Book Service
            </button>
          </div>
        )}
      </nav>
    </>
  );
};
export default Navbar;
