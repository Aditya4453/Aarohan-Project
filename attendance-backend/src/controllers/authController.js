import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  getUserByEmail,
  getUserById
} from "../models/queries.js";
import {
  validateSignup,
  validateLogin
} from "../utils/validators.js";

// =====================
// SIGNUP
// =====================
export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body missing"
      });
    }

    // Validate input
    const validation = validateSignup(name, email, password, role);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors
      });
    }

    // Check existing user
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = await createUser(name, email, hashedPassword, role);
    const user = await getUserById(userId);

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user,
      token
    });
  } catch (error) {
    next(error);
  }
};

// =====================
// LOGIN
// =====================
export const login = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body missing"
      });
    }

    const { email, password } = req.body;

    // Validate input
    const validation = validateLogin(email, password);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors
      });
    }

    // Fetch user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Validate password
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Remove password before sending
    delete user.password;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token
    });
  } catch (error) {
    next(error);
  }
};

// =====================
// LOGOUT
// =====================
export const logout = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      message: "Logout successful"
    });
  } catch (error) {
    next(error);
  }
};
