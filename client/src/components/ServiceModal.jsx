import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaClock, FaArrowRight } from "react-icons/fa";
import { getSubcategories } from "../services/api";
import { ServiceIcon } from "../utils/icons";
const ServiceModal = ({ isOpen, onClose, service }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isOpen && service) {
      const fetchSubs = async () => {
        setLoading(true);
        try {
          const data = await getSubcategories(service._id);
          setSubcategories(data);
        } catch (error) {
          console.error("Failed to load subcategories:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSubs();
    }
  }, [isOpen, service]);
  if (!isOpen || !service) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark-900/60 backdrop-blur-sm"
        />
        {/* Modal Content Dialog */}
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col"
        >
          {/* Header section with image backdrop */}
          <div className="relative h-44 bg-slate-900 flex items-end p-6 md:p-8">
            <img
              src={service.image}
              alt={service.name}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-all focus:outline-none"
            >
              <FaTimes size={16} />
            </button>
            {/* Title & Icon */}
            <div className="relative flex items-center space-x-3 text-white">
              <div className="bg-primary-500 text-white p-3 rounded-xl shadow-lg">
                <ServiceIcon iconName={service.icon} className="text-xl" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-primary-300">
                  Category Details
                </span>
                <h3 className="text-2xl font-bold font-display">
                  {service.name} Services
                </h3>
              </div>
            </div>
          </div>
          {/* Subcategories list area */}
          <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6">
            <p className="text-dark-500 text-sm leading-relaxed border-b border-slate-100 pb-4">
              {service.description}
            </p>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
                <p className="text-dark-400 text-sm font-medium">
                  Loading subcategories...
                </p>
              </div>
            ) : subcategories.length === 0 ? (
              <div className="text-center py-8 text-dark-400">
                No subcategories found for this service category.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subcategories.map((sub, index) => (
                  <motion.div
                    key={sub._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      onClose();
                      navigate(`/service-details/${sub._id}`);
                    }}
                    className="group border border-slate-100 hover:border-primary-100 rounded-xl p-4 cursor-pointer hover:bg-primary-50/20 transition-all flex flex-col justify-between shadow-premium hover:shadow-premium-hover"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-display font-semibold text-dark-900 group-hover:text-primary-600 transition-colors">
                          {sub.name}
                        </h4>
                        <span className="text-primary-600 font-bold bg-primary-50 px-2.5 py-1 rounded-md text-sm">
                          ${sub.price}
                        </span>
                      </div>
                      <p className="text-dark-500 text-xs line-clamp-2 mb-4 leading-relaxed">
                        {sub.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-[11px] text-dark-400 font-medium">
                      <div className="flex items-center">
                        <FaClock className="mr-1 text-primary-500" />
                        <span>{sub.estimatedTime}</span>
                      </div>
                      <span className="flex items-center text-primary-600 font-semibold group-hover:translate-x-1 transition-transform">
                        View Details{" "}
                        <FaArrowRight className="ml-1 text-[10px]" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          {/* Footer Area */}
          <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-t border-slate-100">
            <span className="text-xs text-dark-400">
              Choose a job card to view inclusions and book.
            </span>
            <button
              onClick={onClose}
              className="text-xs text-dark-500 hover:text-dark-900 font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default ServiceModal;
