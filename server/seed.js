const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config();

const User = require("./models/User");
const Space = require("./models/Space");
const Amenity = require("./models/Amenity");

const seedData = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected for seeding...");

  await User.deleteMany();
  await Space.deleteMany();
  await Amenity.deleteMany();

  const adminUser = await User.create({
    name: "Admin User",
    email: "admin@coworking.com",
    password: "admin123",
    role: "admin",
    phone: "9999999999",
    company: "CoWork HQ"
  });

  const ownerUser = await User.create({
    name: "Space Owner",
    email: "owner@coworking.com",
    password: "owner123",
    role: "owner",
    phone: "8888888888",
    company: "SpaceOwner Inc"
  });

  await User.create({
    name: "Test User",
    email: "user@coworking.com",
    password: "user123",
    role: "user",
    phone: "7777777777",
    company: "Startup Co"
  });

  const amenities = await Amenity.insertMany([
    { name: "High-Speed WiFi", icon: "wifi", category: "connectivity" },
    { name: "Air Conditioning", icon: "wind", category: "facilities" },
    { name: "Power Backup", icon: "zap", category: "facilities" },
    { name: "CCTV Security", icon: "shield", category: "security" },
    { name: "Cafeteria", icon: "coffee", category: "services" },
    { name: "Parking", icon: "car", category: "facilities" },
    { name: "Printer/Scanner", icon: "printer", category: "services" },
    { name: "Locker", icon: "lock", category: "security" },
  ]);

  await Space.insertMany([
    {
      owner: ownerUser._id,
      name: "The Hub - Open Workspace",
      description: "A vibrant open workspace perfect for freelancers and startups. High energy environment with all modern amenities.",
      type: "shared_desk",
      location: { address: "101 MG Road", city: "Bangalore", state: "Karnataka", pincode: "560001" },
      capacity: 50,
      areaSize: 2000,
      pricing: { perHour: 100, perDay: 500, perMonth: 8000 },
      amenities: ["High-Speed WiFi", "Air Conditioning", "Power Backup", "Cafeteria"],
      isAvailable: true,
      isVerified: true,
      rating: 4.5
    },
    {
      owner: ownerUser._id,
      name: "Executive Suite",
      description: "Premium private cabin for executives and small teams. Fully furnished with dedicated support staff.",
      type: "private_cabin",
      location: { address: "22 Koramangala", city: "Bangalore", state: "Karnataka", pincode: "560034" },
      capacity: 8,
      areaSize: 400,
      pricing: { perHour: 500, perDay: 2500, perMonth: 35000 },
      amenities: ["High-Speed WiFi", "Air Conditioning", "Power Backup", "CCTV Security", "Locker"],
      isAvailable: true,
      isVerified: true,
      rating: 4.8
    },
    {
      owner: ownerUser._id,
      name: "Innovation Lab",
      description: "Modern meeting room with smart board and video conferencing. Perfect for team meetings and client presentations.",
      type: "meeting_room",
      location: { address: "55 HSR Layout", city: "Bangalore", state: "Karnataka", pincode: "560102" },
      capacity: 12,
      areaSize: 600,
      pricing: { perHour: 800, perDay: 4000, perMonth: 50000 },
      amenities: ["High-Speed WiFi", "Air Conditioning", "Printer/Scanner"],
      isAvailable: true,
      isVerified: true,
      rating: 4.6
    },
    {
      owner: ownerUser._id,
      name: "Flexi Desk Zone",
      description: "Flexible hot desks available on demand. Book for a few hours or the whole day.",
      type: "hot_desk",
      location: { address: "78 Indiranagar", city: "Bangalore", state: "Karnataka", pincode: "560038" },
      capacity: 30,
      areaSize: 1200,
      pricing: { perHour: 150, perDay: 700, perMonth: 10000 },
      amenities: ["High-Speed WiFi", "Air Conditioning", "Power Backup", "Parking"],
      isAvailable: true,
      isVerified: true,
      rating: 4.3
    },
    {
      owner: ownerUser._id,
      name: "Startup Corner",
      description: "Dedicated space for early-stage startups. Community driven environment with mentorship programs.",
      type: "shared_desk",
      location: { address: "12 Whitefield", city: "Bangalore", state: "Karnataka", pincode: "560066" },
      capacity: 25,
      areaSize: 1000,
      pricing: { perHour: 120, perDay: 600, perMonth: 9000 },
      amenities: ["High-Speed WiFi", "Air Conditioning", "Cafeteria", "Parking"],
      isAvailable: true,
      isVerified: true,
      rating: 4.4
    }
  ]);

  console.log("✅ Seed data inserted!");
  console.log("👤 Admin: admin@coworking.com / admin123");
  console.log("👤 Owner: owner@coworking.com / owner123");
  console.log("👤 User:  user@coworking.com / user123");
  process.exit();
};

seedData().catch(err => { console.error(err); process.exit(1); });
