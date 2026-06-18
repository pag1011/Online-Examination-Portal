import { useState } from "react";
import TeacherLayout from "../../layouts/TeacherLayout";
import { uploadNote } from "../../api/teacherApi";
import "../../styles/uploadNotes.css";

// UploadNotes component allows teachers to upload notes for their students
function UploadNotes() {
  const teacherInfo = JSON.parse(localStorage.getItem("teacherInfo"));

  const [title, setTitle] = useState("");

  const [subject, setSubject] = useState("");

  const [noteLink, setNoteLink] = useState("");

  // Handle form submission to upload notes
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await uploadNote({
        title,
        subject,
        noteLink,

        uploadedBy: teacherInfo?.name,
      });

      alert("Notes Uploaded Successfully ✅");

      setTitle("");
      setSubject("");
      setNoteLink("");
    } catch (error) {
      alert("Upload Failed ❌");
    }
  };

  return (
    <TeacherLayout>
      <div className="upload-page">
        <div className="upload-card">
          <h1 className="upload-title">📚 Upload Notes</h1>

          <p className="teacher-name">
            Uploaded By: <strong>{teacherInfo?.name}</strong>
          </p>

          {/* Form for teachers to input note details and upload them */}
          <form className="upload-form" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Enter Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Enter Subject Name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <input
              type="text"
              placeholder="Paste Google Drive Link"
              value={noteLink}
              onChange={(e) => setNoteLink(e.target.value)}
            />

            <button type="submit" className="upload-btn">
              🚀 Upload Notes
            </button>
          </form>
        </div>
      </div>
    </TeacherLayout>
  );
}

export default UploadNotes;
