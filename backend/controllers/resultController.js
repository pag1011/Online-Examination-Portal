const asyncHandler = require("express-async-handler");

const StudentResponse = require("../models/StudentResponse");
const Test = require("../models/Test");
const Result = require("../models/Result");

const { evaluateAnswer } = require("../services/aiService");

// Submit a test
const submitTest = asyncHandler(async (req, res) => {
  const response = await StudentResponse.create(req.body);

  res.status(201).json(response);
});

// Generate results for all student responses
const generateResults = asyncHandler(async (req, res) => {
  await Result.deleteMany({});

  const responses = await StudentResponse.find();
  const generatedResults = [];

  for (const response of responses) {
    const test = await Test.findById(response.testId);

    if (!test) continue;

    let correct = 0;
    let incorrect = 0;

    let totalAiScore = 0;
    let aiFeedbacks = [];

    for (const studentAnswer of response.answers) {
      const matchedQuestion = test.questions.find(
        (q) => q.question === studentAnswer.question,
      );

      if (!matchedQuestion) continue;

      if (matchedQuestion.type === "mcq") {
        if (
          matchedQuestion.correctAnswer.toLowerCase().trim() ===
          studentAnswer.answer.toLowerCase().trim()
        ) {
          correct++;
        } else {
          incorrect++;
        }
      } else if (matchedQuestion.type === "subjective") {
        const aiResponse = await evaluateAnswer(
          matchedQuestion.correctAnswer,
          studentAnswer.answer,
        );

        const scoreMatch = aiResponse.match(/Score:\s*(\d+)/);
        const feedbackMatch = aiResponse.match(/Feedback:\s*(.*)/s);

        const aiScore = scoreMatch ? parseInt(scoreMatch[1]) : 0;
        const aiFeedback = feedbackMatch ? feedbackMatch[1] : "No Feedback";

        totalAiScore += aiScore;

        aiFeedbacks.push(
          `Question: ${matchedQuestion.question}
Feedback: ${aiFeedback}`,
        );

        if (aiScore >= 5) {
          correct++;
        } else {
          incorrect++;
        }
      }
    }

    const percentage = (correct / test.questions.length) * 100;

    const result = await Result.create({
      studentName: response.studentName,
      testName: response.testName,
      testId: test._id,
      correctAnswers: correct,
      incorrectAnswers: incorrect,
      percentage: percentage,
      aiScore: totalAiScore,
      aiFeedback: aiFeedbacks.join("\n\n"),
    });

    generatedResults.push(result);
  }

  res.status(200).json({
    message: "Results Generated Successfully",
    results: generatedResults,
  });
});

const getResults = asyncHandler(async (req, res) => {
  const results = await Result.find();

  res.status(200).json(results);
});

const getStudentResults = asyncHandler(async (req, res) => {
  const results = await Result.find({
    studentName: req.params.studentName,
  });

  res.status(200).json(results);
});

const checkSubmissionStatus = asyncHandler(async (req, res) => {
  const submission = await StudentResponse.findOne({
    studentName: req.params.studentName,

    testId: req.params.testId,
  });

  res.status(200).json({
    submitted: !!submission,
  });
});

module.exports = {
  submitTest,
  generateResults,
  getResults,
  getStudentResults,
  checkSubmissionStatus,
};
