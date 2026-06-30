import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFileAlt,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import { getSubcategories, createBooking } from "../services/api";
const timeSlots = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "01:00 PM - 03:00 PM",
  "03:00 PM - 05:00 PM",
  "05:00 PM - 07:00 PM",
];
const BookingFormSection = ({
  services,
  preselectedServiceId,
  preselectedSubcategoryId,
  selectedLocation,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    serviceId: "",
    subcategoryId: "",
    preferredDate: "",
    preferredTimeSlot: "",
    notes: "",
  });
  const [formSubcategories, setFormSubcategories] = useState([]);
  const [subLoading, setSubLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // Sync preselected/selected location values
  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
    }
    if (preselectedSubcategoryId) {
      setFormData((prev) => ({
        ...prev,
        subcategoryId: preselectedSubcategoryId,
      }));
    }
    if (selectedLocation) {
      setFormData((prev) => ({ ...prev, location: selectedLocation }));
    }
  }, [preselectedServiceId, preselectedSubcategoryId, selectedLocation]);
  // Load subcategories dynamically when serviceId changes
  useEffect(() => {
    if (!formData.serviceId) {
      setFormSubcategories([]);
      setFormData((prev) => ({ ...prev, subcategoryId: "" }));
      return;
    }
    const fetchSubcategories = async () => {
      setSubLoading(true);
      try {
        const subs = await getSubcategories(formData.serviceId);
        setFormSubcategories(subs);

        // Reset subcategory selection if it doesn't match the new list and isn't the preselected one
        const isPreselectedMatch = subs.some(
          (sub) => sub._id === preselectedSubcategoryId,
        );
        if (isPreselectedMatch) {
          setFormData((prev) => ({
            ...prev,
            subcategoryId: preselectedSubcategoryId,
          }));
        } else if (
          formData.subcategoryId &&
          !subs.some((sub) => sub._id === formData.subcategoryId)
        ) {
          setFormData((prev) => ({ ...prev, subcategoryId: "" }));
        }
      } catch (error) {
        console.error("Failed to load subcategories for booking form", error);
      } finally {
        setSubLoading(false);
      }
    };
    fetchSubcategories();
  }, [formData.serviceId, preselectedSubcategoryId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setSubmitLoading(true);
    try {
      const response = await createBooking(formData);
      setSuccessMessage(response.message);

      // Clear form inputs
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        location: selectedLocation || "",
        serviceId: "",
        subcategoryId: "",
        preferredDate: "",
        preferredTimeSlot: "",
        notes: "",
      });
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Failed to submit booking. Please try again.";
      setErrorMessage(msg);
    } finally {
      setSubmitLoading(false);
    }
  };
  return (
    <section
      id="booking"
      className="py-20 bg-ambient-gradient border-t border-slate-100 relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-primary-600 bg-primary-50 inline-block px-3 py-1 rounded-full">
            Easy Booking
          </h2>
          <h3 className="text-3xl font-extrabold text-dark-900 font-display tracking-tight">
            Schedule Your Service Appointment
          </h3>
          <p className="text-dark-500 text-sm leading-relaxed">
            Fill out the form below. Our support agent will call you within 15
            minutes to verify the service and confirm the slot. No upfront
            payment required.
          </p>
        </div>
        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-premium border border-slate-100 p-6 sm:p-10 relative overflow-hidden">
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="bg-emerald-100 text-emerald-600 p-4 rounded-full mb-6"
                >
                  <FaCheckCircle size={64} />
                </motion.div>
                <h4 className="text-2xl font-bold font-display text-dark-900 mb-2">
                  Booking Submitted!
                </h4>
                <p className="text-dark-600 text-sm max-w-md leading-relaxed mb-8">
                  {successMessage}
                </p>
                <button
                  onClick={() => setSuccessMessage("")}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-2.5 rounded-full transition-all text-sm shadow-md"
                >
                  Book Another Service
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {errorMessage && (
              <div className="bg-rose-50 border border-rose-100 text-rose-700 px-4 py-3 rounded-xl text-sm font-medium">
                {errorMessage}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-dark-600 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm text-dark-800"
                  />
                </div>
              </div>
              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-dark-600 uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative">
                  <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm text-dark-800"
                  />
                </div>
              </div>
              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-dark-600 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm text-dark-800"
                  />
                </div>
              </div>
              {/* Location Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-dark-600 uppercase tracking-wider">
                  Location / Address
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your street address"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm text-dark-800"
                  />
                </div>
              </div>
              {/* Select Service */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-dark-600 uppercase tracking-wider">
                  Select Service
                </label>
                <select
                  name="serviceId"
                  required
                  value={formData.serviceId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm text-dark-800 bg-white"
                >
                  <option value="">Choose main category</option>
                  {services.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Select Subcategory */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-dark-600 uppercase tracking-wider">
                  Select Specific Job
                  {subLoading && (
                    <FaSpinner className="inline ml-2 animate-spin text-primary-500" />
                  )}
                </label>
                <select
                  name="subcategoryId"
                  required
                  value={formData.subcategoryId}
                  onChange={handleChange}
                  disabled={
                    !formData.serviceId || formSubcategories.length === 0
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm text-dark-800 bg-white disabled:bg-slate-50 disabled:text-dark-400"
                >
                  <option value="">
                    {!formData.serviceId
                      ? "Choose category first"
                      : formSubcategories.length === 0
                        ? "No subcategories available"
                        : "Choose job / service item"}
                  </option>
                  {formSubcategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name} - (${sub.price})
                    </option>
                  ))}
                </select>
              </div>
              {/* Preferred Date */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-dark-600 uppercase tracking-wider">
                  Preferred Date
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400 pointer-events-none" />
                  <input
                    type="date"
                    name="preferredDate"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm text-dark-800"
                  />
                </div>
              </div>
              {/* Preferred Time Slot */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-dark-600 uppercase tracking-wider">
                  Time Slot
                </label>
                <div className="relative">
                  <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
                  <select
                    name="preferredTimeSlot"
                    required
                    value={formData.preferredTimeSlot}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm text-dark-800 bg-white"
                  >
                    <option value="">Select time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* Additional Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-dark-600 uppercase tracking-wider">
                Additional Instructions
              </label>
              <div className="relative">
                <FaFileAlt className="absolute left-4 top-4 text-dark-400" />
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Provide details about the job, parking instructions, or safety notes..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm text-dark-800"
                />
              </div>
            </div>
            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitLoading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-premium transition-all active:scale-95 flex items-center justify-center text-sm disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {submitLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> Submitting
                    Request...
                  </>
                ) : (
                  "Confirm Appointment Booking"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default BookingFormSection;
