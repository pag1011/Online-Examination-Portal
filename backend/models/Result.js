const mongoose = require("mongoose");

const resultSchema =
  new mongoose.Schema(
    {

      studentName: String,
      testName: String,

      testId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },

      correctAnswers: Number,
      incorrectAnswers: Number,
      percentage: Number,

      aiScore: {
        type: Number,
        default: 0,
      },

      aiFeedback: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Result",
  resultSchema
);