const Inquiry = require("../models/Inquiry");
const Notification = require("../models/Notification");

const createInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create({ ...req.body, user: req.user._id });
    await Notification.create({
      user: req.user._id,
      title: "Inquiry Submitted",
      message: "Your inquiry has been submitted. We will get back to you soon!",
      type: "inquiry"
    });
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ user: req.user._id }).populate("space", "name type location");
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().populate("space", "name").populate("user", "name email");
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const replyToInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    inquiry.reply = req.body.reply;
    inquiry.status = "replied";
    await inquiry.save();
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createInquiry, getMyInquiries, getAllInquiries, replyToInquiry };
