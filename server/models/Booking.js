const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  space: { type: mongoose.Schema.Types.ObjectId, ref: "Space", required: true },
  bookingType: { type: String, enum: ["hourly", "daily", "monthly"], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  startTime: { type: String },
  endTime: { type: String },
  teamSize: { type: Number, default: 1 },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending" },
  paymentStatus: { type: String, enum: ["pending", "paid", "refunded"], default: "pending" },
  specialRequirements: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
