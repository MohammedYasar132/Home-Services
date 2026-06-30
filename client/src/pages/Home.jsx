import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../sections/HeroSection";
import ServicesSection from "../sections/ServicesSection";
import BookingFormSection from "../sections/BookingFormSection";
import ServiceModal from "../components/ServiceModal";
import { getServices } from "../services/api";
const Home = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("New York");

  const [preselectedServiceId, setPreselectedServiceId] = useState("");
  const [preselectedSubcategoryId, setPreselectedSubcategoryId] = useState("");
  const location = useLocation();
  // Fetch all services on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services in homepage:", error);
      }
    };
    fetchServices();
  }, []);
  // Parse location parameters/hashes for redirect scroll triggers
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const serviceId = searchParams.get("serviceId");
    const subcategoryId = searchParams.get("subcategoryId");
    if (serviceId && subcategoryId) {
      setPreselectedServiceId(serviceId);
      setPreselectedSubcategoryId(subcategoryId);

      // Allow slight delay for component mounting before scrolling
      const timer = setTimeout(() => {
        const element = document.getElementById("booking");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location]);
  const handleSelectService = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };
  return (
    <div className="relative">
      {/* 1. Hero Cover Section */}
      <HeroSection
        services={services}
        onSelectService={handleSelectService}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      {/* 2. Services Grid Section */}
      <ServicesSection
        services={services}
        onSelectService={handleSelectService}
      />
      {/* 3. Dynamic Interactive Service Modal Popup */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={selectedService}
      />
      {/* 4. Booking Contact Appointment Reservation Form Section */}
      <BookingFormSection
        services={services}
        preselectedServiceId={preselectedServiceId}
        preselectedSubcategoryId={preselectedSubcategoryId}
        selectedLocation={selectedLocation}
      />
      {/* 5. Contact Section Helper wrapper (maps anchor ID) */}
      <div id="contact" className="relative -mt-10 pt-10" />
    </div>
  );
};
export default Home;
