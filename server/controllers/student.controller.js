import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utilities/token_gen.utility.js";

// @desc    Register a new student
// @route   POST /api/students/register
// @access  Public
export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, number } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const studentExists = await Student.findOne({
      $or: [{ email }],
    });

    if (studentExists) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      number:
        number ||
        Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    });

    if (student) {
      res.status(201).json({
        _id: student._id,
        name: student.name,
        email: student.email,
        number: student.number,
        token: generateToken(student._id, "30d"),
      });
    } else {
      res.status(400).json({ message: "Invalid student data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate a student & get token
// @route   POST /api/students/login
// @access  Public
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const student = await Student.findOne({ email }).select("+password");

    if (student && (await bcrypt.compare(password, student.password))) {
      res.json({
        _id: student._id,
        name: student.name,
        email: student.email,
        number: student.number,
        token: generateToken(student._id, "30d"),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current student data
// @route   GET /api/students/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id);

    if (student) {
      res.json({
        _id: student._id,
        name: student.name,
        email: student.email,
        number: student.number,
      });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
