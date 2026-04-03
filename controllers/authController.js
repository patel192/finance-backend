import jwt from "jsonwebtoken";
import User from "../models/User.js"

export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        user:user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email or password",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
