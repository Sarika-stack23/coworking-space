const User = require("../models/User");
const Space = require("../models/Space");
const Booking = require("../models/Booking");
const Inquiry = require("../models/Inquiry");

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalOwners = await User.countDocuments({ role: "owner" });
    const totalSpaces = await Space.countDocuments();
    const verifiedSpaces = await Space.countDocuments({ isVerified: true });
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: "confirmed" });
    const pendingInquiries = await Inquiry.countDocuments({ status: "pending" });
    const revenue = await Booking.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    res.json({
      totalUsers, totalOwners, totalSpaces, verifiedSpaces,
      totalBookings, confirmedBookings, pendingInquiries,
      totalRevenue: revenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifySpace = async (req, res) => {
  try {
    const space = await Space.findById(req.params.id);
    if (!space) return res.status(404).json({ message: "Space not found" });
    space.isVerified = true;
    await space.save();
    res.json({ message: "Space verified", space });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "admin") return res.status(403).json({ message: "Cannot delete admin" });
    await user.deleteOne();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUnverifiedSpaces = async (req, res) => {
  try {
    const spaces = await Space.find({ isVerified: false }).populate("owner", "name email");
    res.json(spaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStats, getAllUsers, verifySpace, deleteUser, getUnverifiedSpaces };
