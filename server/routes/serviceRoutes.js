import express from "express";
import {
  getAllServices,
  getServiceById,
  getSubcategories,
  getSubcategoryById,
} from "../controllers/serviceController.js";
const router = express.Router();
// Fetch all subcategories (supports optional ?serviceId= query parameter)
router.get("/subcategories", getSubcategories);
// Fetch a specific subcategory by ID (for details view)
router.get("/subcategories/:id", getSubcategoryById);
// Fetch all main services
router.get("/", getAllServices);
// Fetch a specific main service by ID
router.get("/:id", getServiceById);
export default router;
