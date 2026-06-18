const express = require("express");
const router = express.Router();

const {
  createTest,
  getTests,
  getSingleTest,
  updateTest,
  deleteTest,
} = require("../controllers/testController");

router.post(
  "/create",
  createTest
);

router.get(
  "/",
  getTests
);

router.get(
  "/:id",
  getSingleTest
);

router.put(
  "/:id",
  updateTest
);

router.delete(
  "/:id",
  deleteTest
);

module.exports = router;