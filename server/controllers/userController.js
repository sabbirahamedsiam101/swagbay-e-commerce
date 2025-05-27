import generateToken from "../middlewares/generateToken.js";
import User from "../models/user.model.js";
export const getAllUsers = (req, res) => {
  res.send("get all users");
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  res.send(`get user with id ${id}`);
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

export const updateUser = (req, res) => {
  const { id } = req.params;
  res.send(`update user with id ${id}`);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  res.send(`delete user with id ${id}`);
};
