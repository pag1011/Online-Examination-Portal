const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const studentResponseSchema =
  new mongoose.Schema(
    {
      studentName: {
        type: String,
        required: true,
      },

      testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },

      testName: String,

      answers: [answerSchema],
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "StudentResponse",
  studentResponseSchema
);