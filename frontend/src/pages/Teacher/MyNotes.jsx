import { useEffect, useState } from "react";
import axios from "axios";
import TeacherLayout from "../../layouts/TeacherLayout";
import "../../styles/myNotes.css";

// MyNotes component allows teachers to view, search, and manage their uploaded notes
function MyNotes() {
  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");

  const teacherInfo = JSON.parse(localStorage.getItem("teacherInfo"));

  const fetchNotes = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/notes/teacher/${teacherInfo.name}`,
    );

    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Function to delete a note by its ID
  const deleteNote = async (id) => {
    const confirmDelete = window.confirm("Delete this note?");

    if (!confirmDelete) return;

    await axios.delete(`http://localhost:5000/api/notes/${id}`);

    fetchNotes();
  };

  // Filter notes based on search term
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.subject.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <TeacherLayout>
      <div className="my-notes-page">
        <h1>📚 My Uploaded Notes</h1>

        <input
          type="text"
          placeholder="Search Notes..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="notes-grid">
          {filteredNotes.length === 0 ? (
            <h2 className="no-notes">No Notes Found</h2>
          ) : (
            filteredNotes.map((note) => (
              <div key={note._id} className="note-card">
                <h2>{note.title}</h2>

                <p>Subject: {note.subject}</p>

                <a
                  href={note.noteLink}
                  target="_blank"
                  rel="noreferrer"
                  className="open-btn">
                  Open Notes
                </a>

                <button
                  className="delete-btn"
                  onClick={() => deleteNote(note._id)}>
                  Delete Note
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </TeacherLayout>
  );
}

export default MyNotes;
