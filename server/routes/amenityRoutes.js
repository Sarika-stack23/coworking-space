const express = require("express");
const router = express.Router();
const { createAmenity, getAllAmenities, deleteAmenity } = require("../controllers/amenityController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/", getAllAmenities);
router.post("/", protect, authorizeRoles("admin"), createAmenity);
router.delete("/:id", protect, authorizeRoles("admin"), deleteAmenity);

module.exports = router;
