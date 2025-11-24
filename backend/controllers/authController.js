const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ message: "Registration failed", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    console.log("Generated token payload:", { userId: user._id });

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};


exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // remove password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};


exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email, password, phone, profilePic ,preferredCurrency} = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (profilePic) user.profilePic = profilePic;
     if (preferredCurrency) user.preferredCurrency = preferredCurrency;

    // Handle password change
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    const updatedUser = await user.save();
    res.json({
      message: "Profile updated successfully",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        profilePic: updatedUser.profilePic,
        _id: updatedUser._id,
          preferredCurrency: user.preferredCurrency,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};


exports.changePassword = async (req, res) => {
  try {
    console.log("User ID from token:", req.userId);
    console.log("Password change request:", req.body);

    const { currentPassword, newPassword } = req.body;

    // 🧠 Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Both current and new passwords are required",
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔒 Compare current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    // 🔐 Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({
      message: "Error changing password",
      error: error.message,
    });
  }
};
