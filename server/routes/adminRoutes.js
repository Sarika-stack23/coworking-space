const express = require("express");
const router = express.Router();
const { getStats, getAllUsers, verifySpace, deleteUser, getUnverifiedSpaces } = require("../controllers/adminController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/stats", protect, authorizeRoles("admin"), getStats);
router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.delete("/users/:id", protect, authorizeRoles("admin"), deleteUser);
router.get("/spaces/unverified", protect, authorizeRoles("admin"), getUnverifiedSpaces);
router.put("/spaces/:id/verify", protect, authorizeRoles("admin"), verifySpace);

module.exports = router;
