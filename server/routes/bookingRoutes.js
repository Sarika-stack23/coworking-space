const express = require("express");
const router = express.Router();
const { createBooking, getMyBookings, getBookingById, updateBookingStatus, cancelBooking, getAllBookings } = require("../controllers/bookingController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.get("/all", protect, authorizeRoles("admin"), getAllBookings);
router.get("/:id", protect, getBookingById);
router.put("/:id/status", protect, updateBookingStatus);
router.put("/:id/cancel", protect, cancelBooking);

module.exports = router;
