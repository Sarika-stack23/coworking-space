const Booking = require("../models/Booking");
const Space = require("../models/Space");
const Notification = require("../models/Notification");

const createBooking = async (req, res) => {
  try {
    const { spaceId, bookingType, startDate, endDate, startTime, endTime, teamSize, specialRequirements } = req.body;
    const space = await Space.findById(spaceId);
    if (!space) return res.status(404).json({ message: "Space not found" });
    if (!space.isAvailable) return res.status(400).json({ message: "Space not available" });

    let totalAmount = 0;
    if (bookingType === "hourly") totalAmount = space.pricing.perHour * (parseInt(endTime) - parseInt(startTime));
    else if (bookingType === "daily") totalAmount = space.pricing.perDay;
    else if (bookingType === "monthly") totalAmount = space.pricing.perMonth;

    const booking = await Booking.create({
      user: req.user._id, space: spaceId, bookingType,
      startDate, endDate, startTime, endTime,
      teamSize, totalAmount, specialRequirements
    });

    await Space.findByIdAndUpdate(spaceId, { $inc: { totalBookings: 1 } });

    await Notification.create({
      user: req.user._id,
      title: "Booking Confirmed",
      message: `Your booking for ${space.name} has been placed successfully!`,
      type: "booking"
    });

    if (req.io) req.io.emit("newBooking", booking);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("space", "name type location pricing");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("space").populate("user", "name email");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    booking.status = req.body.status || booking.status;
    booking.paymentStatus = req.body.paymentStatus || booking.paymentStatus;
    const updated = await booking.save();
    if (req.io) req.io.emit("bookingUpdated", updated);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not authorized" });
    booking.status = "cancelled";
    booking.cancellationReason = req.body.reason || "Cancelled by user";
    await booking.save();
    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("space", "name type").populate("user", "name email");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getMyBookings, getBookingById, updateBookingStatus, cancelBooking, getAllBookings };
