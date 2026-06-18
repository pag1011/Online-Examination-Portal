import { useEffect, useState } from "react";
import { getNotes } from "../../api/studentApi";

// This component fetches the available notes for a student and displays them in a list format.
function Notes() {
  // State to hold the fetched notes
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data);
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Available Notes</h1>

      {notes.map((note) => (
        <div key={note._id}>
          <h3>{note.title}</h3>

          <p>{note.subject}</p>

          <a href={note.noteLink} target="_blank">
            Open Notes
          </a>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Notes;
