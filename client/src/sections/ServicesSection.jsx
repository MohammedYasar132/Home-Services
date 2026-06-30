import React from "react";
import { motion } from "framer-motion";
import { ServiceIcon } from "../utils/icons";
const ServicesSection = ({ services, onSelectService }) => {
  return (
    <section
      id="services"
      className="py-20 bg-slate-50 border-t border-slate-100 relative"
    >
      {/* Background design accents */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-100/30 rounded-full blur-3xl -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-primary-600 bg-primary-50 inline-block px-3 py-1 rounded-full">
            Our Offerings
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-dark-900 font-display tracking-tight">
            Explore Professional Home Services
          </h3>
          <p className="text-dark-500 text-base leading-relaxed">
            Browse through our wide range of services. From sanitization and
            deep cleaning to electric repair and carpentry, we have you covered.
          </p>
        </div>
        {/* Services Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => onSelectService(service)}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-100 hover:border-primary-100 overflow-hidden shadow-premium hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Image Banner */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Visual Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>
              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow relative text-left">
                {/* Floating Icon Container */}
                <div className="absolute top-[-30px] left-6 bg-primary-600 group-hover:bg-primary-700 text-white p-3.5 rounded-2xl shadow-lg border-2 border-white group-hover:scale-110 transition-all duration-300">
                  <ServiceIcon iconName={service.icon} className="text-lg" />
                </div>
                <div className="mt-4 flex-grow">
                  <h4 className="font-display font-bold text-lg text-dark-900 group-hover:text-primary-600 transition-colors mb-2">
                    {service.name}
                  </h4>
                  <p className="text-dark-500 text-sm leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>
                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center text-xs font-semibold text-primary-600">
                  <span>Browse Subcategories</span>
                  <span className="flex items-center group-hover:translate-x-1 transition-transform">
                    ↳ View
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ServicesSection;
