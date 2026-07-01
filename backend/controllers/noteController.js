const { validationResult } = require("express-validator");
const Note = require("../models/Note");

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content,
      user: req.user._id,
    });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

// @desc    Get notes (own notes for a user, all notes for an admin)
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res, next) => {
  try {
    // Admins can see all notes; regular users only see their own
    const filter = req.user.role === "admin" ? {} : { user: req.user._id };
    const notes = await Note.find(filter).sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single note by id
// @route   GET /api/notes/:id
// @access  Private
const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    // Allow access only to the owner or an admin
    if (note.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      res.status(403);
      throw new Error("Not authorized to access this note");
    }

    res.json(note);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    // Allow updates only for the owner or an admin
    if (note.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      res.status(403);
      throw new Error("Not authorized to update this note");
    }

    note.title = req.body.title !== undefined ? req.body.title : note.title;
    note.content = req.body.content !== undefined ? req.body.content : note.content;

    const updatedNote = await note.save();

    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    // Allow deletion only for the owner or an admin
    if (note.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      res.status(403);
      throw new Error("Not authorized to delete this note");
    }

    await note.deleteOne();

    res.json({ message: "Note removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
