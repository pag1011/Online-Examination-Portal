const express = require("express");
const router = express.Router();

const {
  submitTest,
  generateResults,
  getResults,
  getStudentResults,
  checkSubmissionStatus,
} = require(
  "../controllers/resultController"
);

router.post(
  "/submit",
  submitTest
);

router.post(
  "/generate",
  generateResults
);

router.get(
  "/",
  getResults
);

router.get(
  "/student/:studentName",
  getStudentResults
);

router.get(
  "/check/:studentName/:testId",
  checkSubmissionStatus
);

module.exports = router;