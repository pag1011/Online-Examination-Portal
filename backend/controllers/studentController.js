const asyncHandler = require("express-async-handler");

const bcrypt = require("bcryptjs");

const Student = require("../models/Student");

const generateToken = require("../utils/generateToken");

// Register a new student
const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, password, course } = req.body;

  const studentExists = await Student.findOne({
    email,
  });

  if (studentExists) {
    res.status(400);
    throw new Error("Student Already Exists");
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new student
  const student = await Student.create({
    name,
    email,
    password: hashedPassword,
    course,
  });

  res.status(201).json({
    _id: student._id,
    name: student.name,
    email: student.email,
    token: generateToken(student._id),
  });
});

// Login a student
const loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({
    email,
  });

  if (student && (await bcrypt.compare(password, student.password))) {
    res.json({
      _id: student._id,

      name: student.name,

      email: student.email,

      token: generateToken(student._id),
    });
  } else {
    res.status(401);

    throw new Error("Invalid Credentials");
  }
});

// Get the count of registered students
const getStudentCount = asyncHandler(async (req, res) => {
  const count = await Student.countDocuments();

  res.json({
    count,
  });
});

module.exports = {
  registerStudent,
  loginStudent,
  getStudentCount,
};
