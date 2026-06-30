import React from "react";
import {
  FaTools,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
const Footer = () => {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <footer className="bg-dark-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-slate-800">
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-primary-600 text-white p-2 rounded-lg mr-2">
                <FaTools className="text-lg" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">
                Servi<span className="text-primary-500">co</span>
              </span>
            </div>
            <p className="text-dark-400 max-w-xs text-sm leading-relaxed">
              Premium home maintenance services at your doorstep.
              Background-verified professionals, transparent pricing, and 100%
              satisfaction guaranteed.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => handleScroll("hero")}
                  className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("services")}
                  className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
                >
                  Browse Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("booking")}
                  className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
                >
                  Book Appointment
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("contact")}
                  className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>
          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-white">
              Contact & Support
            </h3>
            <ul className="space-y-3 text-sm text-dark-400">
              <li className="flex items-center">
                <FaPhoneAlt className="mr-3 text-primary-500 flex-shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-primary-500 flex-shrink-0" />
                <span>support@servico.com</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-primary-500 flex-shrink-0 text-base" />
                <span>123 Elite Square, Downtown Office Suite 502</span>
              </li>
            </ul>
            <div className="pt-2 text-xs text-dark-500">
              Office Hours: Mon - Sun (8:00 AM - 8:00 PM)
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-sm text-dark-500">
          <p>
            &copy; {new Date().getFullYear()} Servico Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a
              href="#privacy"
              className="hover:text-dark-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-dark-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
