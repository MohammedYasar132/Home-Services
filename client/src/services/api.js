import axios from "axios";
const API = axios.create({
  baseURL: "https://home-services-jyvw.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
// Services API Methods
export const getServices = async () => {
  const response = await API.get("/services");
  console.log(response);
  return response.data;
};
export const getServiceById = async (id) => {
  const response = await API.get(`/services/${id}`);
  return response.data;
};
// Subcategories API Methods
export const getSubcategories = async (serviceId = "") => {
  const url = serviceId
    ? `/services/subcategories?serviceId=${serviceId}`
    : "/services/subcategories";
  const response = await API.get(url);
  return response.data;
};
export const getSubcategoryById = async (id) => {
  const response = await API.get(`/services/subcategories/${id}`);
  return response.data;
};
// Bookings API Methods
export const createBooking = async (bookingData) => {
  const response = await API.post("/bookings", bookingData);
  return response.data;
};
export const getBookings = async () => {
  const response = await API.get("/bookings");
  return response.data;
};
export default {
  getServices,
  getServiceById,
  getSubcategories,
  getSubcategoryById,
  createBooking,
  getBookings,
};
