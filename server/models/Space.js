const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  type: { type: String, enum: ["private_cabin", "shared_desk", "meeting_room", "hot_desk"], required: true },
  location: {
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true },
  },
  capacity: { type: Number, required: true },
  areaSize: { type: Number },
  pricing: {
    perHour: { type: Number, default: 0 },
    perDay: { type: Number, default: 0 },
    perMonth: { type: Number, default: 0 },
  },
  amenities: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  totalBookings: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Space", spaceSchema);
