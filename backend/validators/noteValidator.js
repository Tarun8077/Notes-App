const { body } = require("express-validator");

// Validation rules for creating a note
const createNoteValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required"),
];

// Validation rules for updating a note
const updateNoteValidator = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty"),
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty"),
];

module.exports = { createNoteValidator, updateNoteValidator };
