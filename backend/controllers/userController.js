const User = require("../models/User");
const bcrypt = require("bcryptjs");


//  GET MY PROFILE
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✏️ UPDATE MY PROFILE (FINAL)
exports.updateMyProfile = async (req, res) => {
  try {
    const { name, password } = req.body;

    const updates = {};

    if (name) updates.name = name;

    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    // ❌ Prevent email update here
    if (req.body.email) {
      return res.status(403).json({ message: "Email cannot be updated here" });
    }

    updates.updatedBy = req.user.id;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    ).select("-password");

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  GET USERS (Pagination + Search + Filter)
exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 5, search, role, status } = req.query;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (role) query.role = role;
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .select("-password")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    const total = await User.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      users
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//  GET SINGLE USER
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//  CREATE USER (Admin only)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      status,
      createdBy: req.user.id,
      updatedBy: req.user.id
    });

    res.status(201).json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//  UPDATE USER (RBAC enforced)
exports.updateUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updates = req.body;

    // ❌ Normal user cannot update others
    if (
      req.user.role === "user" &&
      req.user.id !== targetUser._id.toString()
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // ❌ Manager cannot edit admin
    if (
      req.user.role === "manager" &&
      targetUser.role === "admin"
    ) {
      return res.status(403).json({ message: "Cannot modify admin" });
    }

    // ❌ Only admin can change email
    if (updates.email && req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can update email" });
    }

    // ❌ Only admin can change role
    if (updates.role && req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can change role" });
    }

    updates.updatedBy = req.user.id;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select("-password");

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  SOFT DELETE (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        status: "inactive",
        updatedBy: req.user.id
      },
      { new: true }
    );

    res.json({ message: "User deactivated" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};