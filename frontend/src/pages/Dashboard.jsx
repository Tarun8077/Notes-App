import { useState, useEffect } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  // Load notes on mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await api.get("/notes");
      setNotes(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notes");
    }
  };

  // Reset the form back to "create" mode
  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingId) {
        // Update an existing note
        await api.put(`/notes/${editingId}`, { title, content });
      } else {
        // Create a new note
        await api.post("/notes", { title, content });
      }
      resetForm();
      fetchNotes();
    } catch (err) {
      const message =
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        "Failed to save note";
      setError(message);
    }
  };

  // Load a note into the form for editing
  const handleEdit = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete note");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <p className="error">{error}</p>}

      <div className="form-container">
        <h3>{editingId ? "Edit Note" : "Create Note"}</h3>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <button type="submit">
            {editingId ? "Update Note" : "Add Note"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <h3>Your Notes</h3>
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note._id} className="note-item">
              <h4>{note.title}</h4>
              <p>{note.content}</p>
              <div className="note-actions">
                <button onClick={() => handleEdit(note)}>Edit</button>
                <button onClick={() => handleDelete(note._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
