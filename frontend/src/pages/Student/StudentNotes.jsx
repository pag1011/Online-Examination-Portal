import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/studentNotes.css";
import Footer from "../../components/Footer";
import { API_URL } from "../../config";

// This component displays a list of study notes available to students,
// allowing them to search and access notes based on title or subject.
// It fetches the notes from the backend and provides a user-friendly interface for browsing and opening the notes.
function StudentNotes() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/notes`);

        setNotes(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();
  }, []);

  // Filter notes based on search input
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.subject.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="notes-container">
        <h1 className="notes-title">📚 Study Notes</h1>

        <input
          type="text"
          placeholder="Search Notes..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredNotes.length === 0 ? (
          <div className="no-notes">No Notes Found</div>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <div key={note._id} className="note-card">
                <h2>{note.title}</h2>

                <p>
                  <strong>Subject:</strong> {note.subject}
                </p>
                <p>
                  <strong>Uploaded By:</strong> {note.uploadedBy}
                </p>

                <a
                  href={note.noteLink}
                  target="_blank"
                  rel="noreferrer"
                  className="open-btn">
                  📖 Open Notes
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default StudentNotes;
