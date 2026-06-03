const mongoose = require("mongoose");

const amenitySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  icon: { type: String, trim: true },
  category: { type: String, enum: ["connectivity", "facilities", "services", "security"], default: "facilities" },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Amenity", amenitySchema);
