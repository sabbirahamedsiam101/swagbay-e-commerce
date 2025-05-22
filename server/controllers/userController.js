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
    const user = new User({
      name,
      email,
      password,
    });
    console.log(user);
    await user.save();
    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
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
