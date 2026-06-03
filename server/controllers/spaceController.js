const Space = require("../models/Space");

const createSpace = async (req, res) => {
  try {
    const space = await Space.create({ ...req.body, owner: req.user._id });
    if (req.io) req.io.emit("spaceCreated", space);
    res.status(201).json(space);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSpaces = async (req, res) => {
  try {
    const { type, city, minPrice, maxPrice, capacity, amenities } = req.query;
    const filter = { isAvailable: true };
    if (type) filter.type = type;
    if (city) filter["location.city"] = new RegExp(city, "i");
    if (capacity) filter.capacity = { $gte: parseInt(capacity) };
    if (minPrice) filter["pricing.perDay"] = { $gte: parseInt(minPrice) };
    if (maxPrice) filter["pricing.perDay"] = { ...filter["pricing.perDay"], $lte: parseInt(maxPrice) };
    const spaces = await Space.find(filter).populate("owner", "name email");
    res.json(spaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSpaceById = async (req, res) => {
  try {
    const space = await Space.findById(req.params.id).populate("owner", "name email phone");
    if (!space) return res.status(404).json({ message: "Space not found" });
    res.json(space);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSpace = async (req, res) => {
  try {
    const space = await Space.findById(req.params.id);
    if (!space) return res.status(404).json({ message: "Space not found" });
    if (space.owner.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    const updated = await Space.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (req.io) req.io.emit("spaceUpdated", updated);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSpace = async (req, res) => {
  try {
    const space = await Space.findById(req.params.id);
    if (!space) return res.status(404).json({ message: "Space not found" });
    await space.deleteOne();
    res.json({ message: "Space removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMySpaces = async (req, res) => {
  try {
    const spaces = await Space.find({ owner: req.user._id });
    res.json(spaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSpace, getAllSpaces, getSpaceById, updateSpace, deleteSpace, getMySpaces };
