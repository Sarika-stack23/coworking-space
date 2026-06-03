const express = require("express");
const router = express.Router();
const { createInquiry, getMyInquiries, getAllInquiries, replyToInquiry } = require("../controllers/inquiryController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", protect, createInquiry);
router.get("/my", protect, getMyInquiries);
router.get("/all", protect, authorizeRoles("admin"), getAllInquiries);
router.put("/:id/reply", protect, authorizeRoles("admin"), replyToInquiry);

module.exports = router;
