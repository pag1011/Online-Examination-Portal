const asyncHandler = require("express-async-handler");
const Note = require("../models/Note");

// Upload a note
const uploadNote = asyncHandler(async (req, res) => {
  const { title, subject, noteLink, uploadedBy } = req.body;

  const note = await Note.create({
    title,
    subject,
    noteLink,
    uploadedBy,
  });

  res.status(201).json(note);
});

// Get all notes
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();

  res.status(200).json(notes);
});

// Get notes by teacher name
const getTeacherNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({
    uploadedBy: req.params.teacherName,
  });

  res.status(200).json(notes);
});

// Delete a note
const deleteNote = asyncHandler(async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "Note Deleted Successfully",
  });
});

module.exports = {
  uploadNote,
  getNotes,
  getTeacherNotes,
  deleteNote,
};
