const asyncHandler = require("express-async-handler");
const Teacher = require("../models/Teacher");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// Register a new teacher
const registerTeacher = asyncHandler(async (req, res) => {
  const { name, email, password, subject } = req.body;

  if (!name || !email || !password || !subject) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  // Check if teacher already exists
  const teacherExists = await Teacher.findOne({ email });

  if (teacherExists) {
    res.status(400);
    throw new Error("Teacher already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const teacher = await Teacher.create({
    name,
    email,
    password: hashedPassword,
    subject,
  });

  // Return the teacher data along with a token
  if (teacher) {
    res.status(201).json({
      _id: teacher._id,
      name: teacher.name,
      email: teacher.email,
      subject: teacher.subject,
      token: generateToken(teacher._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid teacher data");
  }
});

// Authenticate a teacher and get a token
const loginTeacher = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const teacher = await Teacher.findOne({ email });

  if (teacher && (await bcrypt.compare(password, teacher.password))) {
    res.json({
      _id: teacher._id,
      name: teacher.name,
      email: teacher.email,
      subject: teacher.subject,
      token: generateToken(teacher._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = {
  registerTeacher,
  loginTeacher,
};
