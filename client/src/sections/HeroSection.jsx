import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarCheck,
  FaBroom,
  FaBolt,
  FaWrench,
  FaSnowflake,
  FaHammer,
  FaPaintRoller,
} from "react-icons/fa";
import { getSubcategories } from "../services/api";
import { useNavigate } from "react-router-dom";
const quickCards = [
  {
    name: "Cleaning",
    icon: FaBroom,
    color: "from-violet-500 to-indigo-600",
    delay: 0.1,
  },
  {
    name: "Electrical",
    icon: FaBolt,
    color: "from-amber-400 to-orange-500",
    delay: 0.2,
  },
  {
    name: "Plumbing",
    icon: FaWrench,
    color: "from-blue-500 to-sky-600",
    delay: 0.3,
  },
  {
    name: "AC Service",
    icon: FaSnowflake,
    color: "from-cyan-400 to-blue-500",
    delay: 0.4,
  },
  {
    name: "Carpenter",
    icon: FaHammer,
    color: "from-emerald-400 to-teal-600",
    delay: 0.5,
  },
  {
    name: "Painting",
    icon: FaPaintRoller,
    color: "from-rose-400 to-pink-600",
    delay: 0.6,
  },
];
const locations = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "San Francisco",
  "Miami",
  "Seattle",
  "Boston",
];
const HeroSection = ({
  services,
  onSelectService,
  selectedLocation,
  setSelectedLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showLocationList, setShowLocationList] = useState(false);
  const navigate = useNavigate();
  // Load all subcategories for search index
  useEffect(() => {
    const fetchAllSubs = async () => {
      try {
        const subs = await getSubcategories();
        setAllSubcategories(subs);
      } catch (error) {
        console.error("Failed to load subcategories for search index", error);
      }
    };
    fetchAllSubs();
  }, []);
  // Filter search results
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();

    // Match against main services or subcategories
    const matchingServices = services
      .filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query),
      )
      .map((s) => ({ ...s, type: "service" }));
    const matchingSubs = allSubcategories
      .filter(
        (sub) =>
          sub.name.toLowerCase().includes(query) ||
          sub.description.toLowerCase().includes(query),
      )
      .map((sub) => ({ ...sub, type: "subcategory" }));
    setSearchResults([...matchingServices, ...matchingSubs].slice(0, 5));
  }, [searchQuery, services, allSubcategories]);
  const handleSearchResultClick = (item) => {
    setSearchQuery("");
    setSearchResults([]);
    if (item.type === "service") {
      onSelectService(item);
    } else {
      navigate(`/service-details/${item._id}`);
    }
  };
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleQuickCardClick = (cardName) => {
    const matchedService = services.find(
      (s) => s.name.toLowerCase() === cardName.toLowerCase(),
    );
    if (matchedService) {
      onSelectService(matchedService);
    } else {
      // Fallback: Scroll to services section
      scrollToSection("services");
    }
  };
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center bg-ambient-gradient py-12 md:py-20 overflow-hidden"
    >
      {/* Background visual abstract blobs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent-100/30 rounded-full blur-3xl -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-8 z-10 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-primary-50 border border-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-xs font-semibold"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
              </span>
              <span>100% Insured & Licensed Home Experts</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-dark-900 leading-[1.1] font-display"
            >
              Professional Home Services <br />
              <span className="text-gradient">at Your Doorstep</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-dark-600 text-base sm:text-lg max-w-xl leading-relaxed"
            >
              Book certified, background-verified home care professionals.
              Instant pricing, 60-day repair warranties, and top-tier customer
              support.
            </motion.p>
            {/* Selection & Search Bar Panels */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card shadow-premium p-4 rounded-2xl max-w-2xl border border-slate-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 relative">
                {/* Location Dropdown Selector */}
                <div className="md:col-span-5 relative border-b md:border-b-0 md:border-r border-slate-200 pb-3 md:pb-0 md:pr-4 flex items-center">
                  <FaMapMarkerAlt className="text-primary-500 mr-2.5 flex-shrink-0" />
                  <div className="w-full text-left">
                    <label className="block text-[10px] font-bold text-dark-400 uppercase tracking-wider">
                      Your City
                    </label>
                    <button
                      onClick={() => setShowLocationList(!showLocationList)}
                      className="w-full text-left text-sm font-semibold text-dark-800 focus:outline-none flex justify-between items-center"
                    >
                      <span>{selectedLocation || "Select Location"}</span>
                      <span className="text-[10px] text-dark-400">▼</span>
                    </button>
                  </div>

                  {/* Location Dropdown Popover */}
                  <AnimatePresence>
                    {showLocationList && (
                      <>
                        <div
                          className="fixed inset-0 z-20"
                          onClick={() => setShowLocationList(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-3 w-56 bg-white border border-slate-100 rounded-xl shadow-xl z-30 max-h-56 overflow-y-auto py-1"
                        >
                          {locations.map((loc) => (
                            <button
                              key={loc}
                              onClick={() => {
                                setSelectedLocation(loc);
                                setShowLocationList(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-primary-50 hover:text-primary-700 transition-colors flex items-center ${
                                selectedLocation === loc
                                  ? "text-primary-600 font-semibold bg-primary-50/50"
                                  : "text-dark-700"
                              }`}
                            >
                              <FaMapMarkerAlt className="mr-2 text-xs opacity-60" />
                              {loc}
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
                {/* Service Auto-Suggest Search Box */}
                <div className="md:col-span-7 flex items-center pl-0 md:pl-2 relative">
                  <FaSearch className="text-dark-400 mr-2.5 flex-shrink-0" />
                  <div className="w-full relative">
                    <label className="block text-[10px] font-bold text-dark-400 uppercase tracking-wider">
                      Search
                    </label>
                    <input
                      type="text"
                      placeholder="What service are you looking for?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-none p-0 text-sm font-semibold text-dark-800 placeholder-dark-400 focus:outline-none focus:ring-0"
                    />
                  </div>
                  {/* Auto-suggest popover */}
                  <AnimatePresence>
                    {searchResults.length > 0 && (
                      <>
                        <div
                          className="fixed inset-0 z-20"
                          onClick={() => setSearchResults([])}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full right-0 left-[-16px] md:left-[-12px] mt-3 bg-white border border-slate-100 rounded-xl shadow-2xl z-30 overflow-hidden"
                        >
                          <div className="px-4 py-2 border-b border-slate-50 text-[10px] font-bold text-dark-400 uppercase tracking-wider">
                            Suggested Results
                          </div>
                          {searchResults.map((item) => (
                            <button
                              key={item._id}
                              onClick={() => handleSearchResultClick(item)}
                              className="w-full text-left px-4 py-3 hover:bg-primary-50 transition-colors flex items-center justify-between border-b border-slate-50 last:border-0"
                            >
                              <div className="flex items-center space-x-3">
                                <span
                                  className={`p-1.5 rounded-lg text-xs ${
                                    item.type === "service"
                                      ? "bg-primary-100 text-primary-700"
                                      : "bg-accent-100 text-accent-700"
                                  }`}
                                >
                                  {item.type === "service" ? "Category" : "Job"}
                                </span>
                                <div>
                                  <div className="text-sm font-semibold text-dark-800">
                                    {item.name}
                                  </div>
                                  <div className="text-xs text-dark-400 line-clamp-1">
                                    {item.description}
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs text-primary-600 font-semibold">
                                ↳ Open
                              </span>
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
            {/* Quick Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => scrollToSection("booking")}
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-premium transition-all flex items-center active:scale-95 text-sm"
              >
                <FaCalendarCheck className="mr-2" /> Book Appointment Now
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="bg-white hover:bg-slate-50 text-dark-800 font-semibold px-8 py-3.5 rounded-full border border-slate-200 shadow-sm transition-all text-sm hover:border-slate-300"
              >
                Browse All Services
              </button>
            </motion.div>
          </div>
          {/* Right Column Layout: Modern floating cards */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end h-[380px] sm:h-[430px] md:h-[480px]">
            {/* Visual Backdrops */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary-100/10 rounded-3xl -z-10" />
            <div className="relative w-full max-w-[500px] h-full flex items-center justify-center">
              {/* Premium Center Badge */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute z-30 flex items-center justify-center"
              >
                {/* Rotating Ring */}
                <div className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-58 md:h-58 rounded-full border-2 border-dashed border-primary-300 animate-spin-slow"></div>
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-55 md:h-55 rounded-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-[3px] shadow-2xl">
                  <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-center px-5">
                    {/* Icon goes HERE */}
                    <div className="bg-primary-100 p-2 sm:p-3 rounded-full">
                      <HiSparkles className="text-primary-600 text-lg sm:text-xl md:text-2xl" />
                    </div>

                    <p className="text-[8px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-gray-500 font-semibold">
                      Premium
                    </p>

                    <h2 className="text-base sm:text-xl md:text-2xl font-black text-primary-700 leading-tight">
                      Interior
                    </h2>

                    <h2 className="text-base sm:text-xl md:text-2xl font-black text-gray-900 leading-tight">
                      Designer
                    </h2>

                    <p className="text-[10px] sm:text-[13px] md:text-[16px] font-semibold text-gray-600 leading-tight mt-1">
                      & Home Renovation
                    </p>

                    <div className="w-8 sm:w-10 md:w-14 h-1 rounded-full bg-primary-500 my-2"></div>
                  </div>

                  {/* Glow */}
                  <div className="absolute inset-0 rounded-full bg-primary-500 blur-2xl opacity-20 -z-10"></div>
                </div>
              </motion.div>
              {/* Staggered Circular Layout of Service Cards */}
              {quickCards.map((card, i) => {
                const angle = (i * 2 * Math.PI) / quickCards.length;
                const radius =
                  window.innerWidth < 640
                    ? 140 // Mobile
                    : window.innerWidth < 768
                      ? 165 // Tablet
                      : 210; // Desktop
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                const CardIcon = card.icon;
                return (
                  <motion.div
                    key={card.name}
                    style={{ x, y }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: card.delay,
                    }}
                    className="absolute cursor-pointer z-20 group"
                    onClick={() => handleQuickCardClick(card.name)}
                  >
                    {/* Hover Floating animation with dynamic tilt */}
                    <motion.div
                      animate={{
                        y: [0, -12, 0],
                        rotate: [-2, 2, -2],
                        scale: [1, 1.04, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: i * 0.2,
                      }}
                      className={`flex flex-col items-center justify-center
                      w-24 h-24
                      sm:w-24 sm:h-24
                      md:w-24 md:h-24
                      lg:w-28 lg:h-28
                      bg-white border border-slate-100 shadow-premium hover:shadow-2xl rounded-2xl p-2 sm:p-3 transition-all hover:-translate-y-2 md:hover:-translate-y-4 hover:scale-105`}
                    >
                      <div
                        className={`p-2.5 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-md group-hover:scale-110 transition-transform`}
                      >
                        <CardIcon
                          className="
                            w-7 h-7
                            sm:w-8 sm:h-8
                            md:w-6 md:h-6
                            lg:w-7 lg:h-7
                          "
                        />
                      </div>
                      <span className="mt-1.5 font-display font-bold text-[10px] sm:text-[11px] md:text-xs text-dark-800 text-center leading-tight">
                        {card.name}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
