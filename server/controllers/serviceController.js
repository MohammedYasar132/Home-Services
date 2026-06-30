import Service from "../models/Service.js";
import Subcategory from "../models/Subcategory.js";
// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching services",
      error: error.message,
    });
  }
};
// @desc    Get service by ID
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service category not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching service details",
      error: error.message,
    });
  }
};
// @desc    Get all subcategories (optionally filtered by serviceId)
// @route   GET /api/services/subcategories
// @access  Public
export const getSubcategories = async (req, res) => {
  try {
    const { serviceId } = req.query;
    const filter = serviceId ? { serviceId } : {};
    const subcategories = await Subcategory.find(filter).populate(
      "serviceId",
      "name icon",
    );
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching subcategories",
      error: error.message,
    });
  }
};
// @desc    Get single subcategory by ID
// @route   GET /api/services/subcategories/:id
// @access  Public
export const getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id).populate(
      "serviceId",
      "name icon",
    );
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching subcategory details",
      error: error.message,
    });
  }
};
