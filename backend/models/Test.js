const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,

  type: {
    type: String,
    enum: ["mcq", "subjective"],
  },

  options: [String],

  correctAnswer: String,
  marks: Number,
});

const testSchema = new mongoose.Schema(
  {
    testName: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    questions: [questionSchema],

    createdBy: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Test", testSchema);