// ⚡ FIXED: Added '.js' extension to match your project's strict ES Module requirements
import loginModel from "../model/User.model.js"; 
import bcrypt from "bcrypt"; //  Change to native bcrypt
import jwt from "jsonwebtoken";

// ================= REGISTER =================
export async function signup(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Validation
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Check existing user
    const existingUser = await loginModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await loginModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id, 
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Signup error" });
  }
}

// ================= LOGIN =================
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const user = await loginModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ⚡ ALIGNED PAYLOAD: Keys now read as 'id' to perfectly match req.user.id downstream
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id, 
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Login error" });
  }
}