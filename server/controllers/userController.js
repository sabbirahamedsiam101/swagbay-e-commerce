import generateToken from "../middlewares/generateToken.js";
import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find({}, "_id email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
      pagination: {
        totalUsers,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Find user by ID
    const user = await User.findById(id);

    // If not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If found
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user",
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({
      name,
      email,
      password,
    });
    console.log(user);
    await user.save();
    res.status(201).send({
      message: "User registered successfully!",
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    const token = await generateToken(user);
    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.deleteOne({ _id: id });
  res.send(`update user with id ${id}`);
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!id || !role) {
    return res.status(400).json({
      success: false,
      message: "User ID and role are required",
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser, // Optional: include deleted user data
    });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
