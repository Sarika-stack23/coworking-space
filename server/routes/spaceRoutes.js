const express = require("express");
const router = express.Router();
const { createSpace, getAllSpaces, getSpaceById, updateSpace, deleteSpace, getMySpaces } = require("../controllers/spaceController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/", getAllSpaces);
router.get("/my", protect, getMySpaces);
router.get("/:id", getSpaceById);
router.post("/", protect, authorizeRoles("admin", "owner"), createSpace);
router.put("/:id", protect, updateSpace);
router.delete("/:id", protect, authorizeRoles("admin"), deleteSpace);

module.exports = router;
