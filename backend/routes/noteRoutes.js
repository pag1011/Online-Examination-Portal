const express = require("express");
const router = express.Router();

const {
  uploadNote,
  getNotes,
  getTeacherNotes,
  deleteNote,
} = require("../controllers/noteController");

router.post(
  "/upload",
  uploadNote
);

router.get(
  "/",
  getNotes
);

router.get(
  "/teacher/:teacherName",
  getTeacherNotes
);

router.delete(
  "/:id",
  deleteNote
);

module.exports = router;