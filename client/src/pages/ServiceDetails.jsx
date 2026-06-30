import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaClock,
  FaCheck,
  FaInfoCircle,
  FaShieldAlt,
  FaStar,
  FaChevronLeft,
  FaTag,
} from "react-icons/fa";
import { getSubcategoryById } from "../services/api";
const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subcategory, setSubcategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchSubcategoryDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getSubcategoryById(id);
        setSubcategory(data);
      } catch (err) {
        console.error("Failed to load subcategory details:", err);
        setError(
          "Could not retrieve service details. It may have been removed or updated.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchSubcategoryDetails();

    // Always scroll to top of window on page navigation
    window.scrollTo(0, 0);
  }, [id]);
  const handleBookNow = () => {
    if (!subcategory) return;
    const parentServiceId = subcategory.serviceId?._id || subcategory.serviceId;
    navigate(`/?serviceId=${parentServiceId}&subcategoryId=${subcategory._id}`);
  };
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        <p className="text-dark-500 font-medium">
          Loading service specifications...
        </p>
      </div>
    );
  }
  if (error || !subcategory) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-6">
        <div className="text-rose-500 text-6xl">⚠️</div>
        <h2 className="text-2xl font-bold font-display text-dark-900">
          Service Not Found
        </h2>
        <p className="text-dark-500 text-sm leading-relaxed">
          {error || "Unable to locate this subcategory."}
        </p>
        <Link
          to="/"
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-md text-sm transition-all"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }
  const parentServiceName = subcategory.serviceId?.name || "Service";
  return (
    <div className="py-12 bg-ambient-gradient min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumbs & Back Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            <FaChevronLeft className="mr-1.5 text-xs" /> Back to Services
          </Link>
          <div className="text-xs text-dark-400 font-medium">
            <Link to="/" className="hover:text-primary-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-dark-500 font-semibold">
              {parentServiceName}
            </span>
            <span className="mx-2">&gt;</span>
            <span className="text-primary-600 font-semibold">
              {subcategory.name}
            </span>
          </div>
        </div>
        {/* Details Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side Column: Image Banner and booking card Summary */}
          <div className="lg:col-span-5 space-y-6">
            {/* Image Box */}
            <div className="bg-white rounded-2xl border border-slate-100 p-2.5 shadow-premium overflow-hidden">
              <img
                src={subcategory.image}
                alt={subcategory.name}
                className="w-full h-80 object-cover rounded-xl shadow-inner"
              />
            </div>
            {/* Quick Price/Booking card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-premium space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <FaTag className="text-primary-500" />
                  <span className="text-sm font-bold text-dark-500">
                    Service Price
                  </span>
                </div>
                <span className="text-3xl font-extrabold text-primary-600">
                  ${subcategory.price}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <FaClock className="text-primary-500" />
                  <span className="text-sm font-bold text-dark-500">
                    Estimated Duration
                  </span>
                </div>
                <span className="text-sm font-bold text-dark-800">
                  {subcategory.estimatedTime}
                </span>
              </div>
              <div className="bg-primary-50/50 rounded-xl p-4 flex items-start space-x-3 text-xs text-primary-700 border border-primary-100">
                <FaInfoCircle size={16} className="mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">
                  No online payment needed. Pay directly via Cash or Card only
                  after the service completion to your technician.
                </p>
              </div>
              <button
                onClick={handleBookNow}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-premium transition-all active:scale-95 text-center text-sm"
              >
                Book This Service Now
              </button>
            </div>
          </div>
          {/* Right Side Column: Detailed text specifications */}
          <div className="lg:col-span-7 space-y-8 bg-white border border-slate-100 p-6 sm:p-10 rounded-2xl shadow-premium">
            {/* Title / Description */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-extrabold text-primary-600 bg-primary-50 inline-block px-3 py-1 rounded-full">
                {parentServiceName} Service
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-dark-900 font-display leading-tight">
                {subcategory.name}
              </h1>
              <p className="text-dark-600 text-sm sm:text-base leading-relaxed">
                {subcategory.description}
              </p>
            </div>
            {/* What's Included */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h3 className="font-display font-bold text-lg text-dark-900 flex items-center">
                <span className="w-1.5 h-6 bg-primary-600 rounded mr-2.5"></span>
                What's Included in the Service Package
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {subcategory.whatsIncluded.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start text-sm text-dark-600"
                  >
                    <span className="bg-emerald-50 text-emerald-600 p-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                      <FaCheck size={10} />
                    </span>
                    <span className="leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Features list */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h3 className="font-display font-bold text-lg text-dark-900 flex items-center">
                <span className="w-1.5 h-6 bg-primary-600 rounded mr-2.5"></span>
                Key Features
              </h3>
              <ul className="space-y-3">
                {subcategory.features.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-sm text-dark-600"
                  >
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-3.5 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Why Choose Us */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h3 className="font-display font-bold text-lg text-dark-900 flex items-center">
                <span className="w-1.5 h-6 bg-primary-600 rounded mr-2.5"></span>
                Why Choose Servico
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subcategory.whyChooseUs.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start p-3 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <span className="bg-primary-50 text-primary-600 p-1.5 rounded-lg mr-3 flex-shrink-0">
                      {idx % 2 === 0 ? (
                        <FaShieldAlt size={14} />
                      ) : (
                        <FaStar size={14} />
                      )}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-dark-800 mb-0.5">
                        Verified Choice
                      </h4>
                      <p className="text-[11px] text-dark-500 leading-normal">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServiceDetails;
