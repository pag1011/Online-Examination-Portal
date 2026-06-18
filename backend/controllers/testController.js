const asyncHandler = require("express-async-handler");
const Test = require("../models/Test");

// Create a new test
const createTest = asyncHandler(async (req, res) => {
  const test = await Test.create(req.body);
  res.status(201).json(test);
});

// Get all tests
const getTests = asyncHandler(async (req, res) => {
  const tests = await Test.find();
  res.status(200).json(tests);
});

// Get a single test by ID
const getSingleTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);

  if (!test) {
    res.status(404);
    throw new Error("Test not found");
  }

  res.status(200).json(test);
});

// Update a test by ID
const updateTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);

  if (!test) {
    res.status(404);
    throw new Error("Test not found");
  }

  const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTest);
});

// Delete a test by ID
const deleteTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);

  if (!test) {
    res.status(404);
    throw new Error("Test not found");
  }

  await Test.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "Test Deleted Successfully",
  });
});

module.exports = {
  createTest,
  getTests,
  getSingleTest,
  updateTest,
  deleteTest,
};
