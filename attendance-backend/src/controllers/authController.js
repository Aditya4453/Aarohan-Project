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
    const { name, email, password, role } = req.body || {};

    // Sanitize inputs
    const cleanedName = name?.trim();
    const cleanedEmail = email?.trim().toLowerCase();
    const cleanedPassword = password?.trim();
    const cleanedRole = role?.trim().toLowerCase();

    console.log('[SIGNUP] Raw email:', email, 'Cleaned email:', cleanedEmail);
    console.log('[SIGNUP] Raw role:', role, 'Cleaned role:', cleanedRole);

    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body missing"
      });
    }

    // Validate input
    const validation = validateSignup(cleanedName, cleanedEmail, cleanedPassword, cleanedRole);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors
      });
    }

    // Check existing user
    const existingUser = await getUserByEmail(cleanedEmail);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(cleanedPassword, 10);

    // Create user
    const userId = await createUser(cleanedName, cleanedEmail, hashedPassword, cleanedRole);
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

    const { email, password } = req.body || {};

    // Sanitize inputs
    const cleanedEmail = email?.trim().toLowerCase();
    const cleanedPassword = password?.trim();

    console.log('[LOGIN] Raw email:', email, 'Cleaned email:', cleanedEmail);
    console.log('[LOGIN] Raw password length:', password?.length, 'Cleaned length:', cleanedPassword?.length);

    // Validate input
    const validation = validateLogin(cleanedEmail, cleanedPassword);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors
      });
    }

    // Fetch user by email
    const user = await getUserByEmail(cleanedEmail);
    if (!user) {
      console.log(`Login failed: User not found for cleaned email ${cleanedEmail}`);
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Validate password
    const isPassMatch = await bcrypt.compare(cleanedPassword, user.password);
    if (!isPassMatch) {
      console.log(`Login failed: Password mismatch for cleaned email ${cleanedEmail}`);
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
