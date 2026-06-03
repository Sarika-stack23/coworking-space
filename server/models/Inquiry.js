const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  space: { type: mongoose.Schema.Types.ObjectId, ref: "Space", required: true },
  message: { type: String, required: true, trim: true },
  teamSize: { type: Number, default: 1 },
  budget: { type: Number },
  preferredDate: { type: Date },
  status: { type: String, enum: ["pending", "replied", "closed"], default: "pending" },
  reply: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model("Inquiry", inquirySchema);
