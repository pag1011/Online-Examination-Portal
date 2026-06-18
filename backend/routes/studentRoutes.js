const express = require("express");
const router = express.Router();

const {
  registerStudent,
  loginStudent,
  getStudentCount,
} = require(
  "../controllers/studentController"
);

router.post(
  "/register",
  registerStudent
);

router.post(
  "/login",
  loginStudent
);

router.get(
  "/count",
  getStudentCount
);

module.exports = router;