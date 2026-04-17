const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile
} = require("../controllers/userController");

// 👤 My Profile
router.get("/me", auth, getMyProfile);
router.put("/me", auth, updateMyProfile);

// 👥 Get all users (Admin + Manager)
router.get("/", auth, authorize("admin", "manager"), getUsers);

// 👤 Get single user
router.get("/:id", auth, getUser);

// ➕ Create user (Admin only)
router.post("/", auth, authorize("admin"), createUser);

// ✏️ Update user (Admin + Manager restrictions inside controller)
router.put("/:id", auth, updateUser);

// ❌ Soft delete (Admin only)
router.delete("/:id", auth, authorize("admin"), deleteUser);

module.exports = router;