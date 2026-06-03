const Amenity = require("../models/Amenity");

const createAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.create(req.body);
    res.status(201).json(amenity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find({ isActive: true });
    res.json(amenities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.findById(req.params.id);
    if (!amenity) return res.status(404).json({ message: "Amenity not found" });
    await amenity.deleteOne();
    res.json({ message: "Amenity deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAmenity, getAllAmenities, deleteAmenity };
