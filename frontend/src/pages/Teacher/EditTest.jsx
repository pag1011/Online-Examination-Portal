import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TeacherLayout from "../../layouts/TeacherLayout";
import { updateTest } from "../../api/teacherApi";
import "../../styles/editTest.css";
import { API_URL } from "../../config";

// EditTest component allows teachers to edit an existing test
function EditTest() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [testName, setTestName] = useState("");

  const [subject, setSubject] = useState("");

  const [duration, setDuration] = useState("");

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadTest = async () => {
      const response = await axios.get(`${API_URL}/api/tests/${id}`);

      const test = response.data;

      setTestName(test.testName);
      setSubject(test.subject);
      setDuration(test.duration);
      setQuestions(test.questions);
    };

    loadTest();
  }, [id]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];

    updated[index][field] = value;

    setQuestions(updated);
  };

  const saveChanges = async () => {
    try {
      await updateTest(id, {
        testName,
        subject,
        duration,
        questions,
      });

      alert("Test Updated Successfully");

      navigate("/manage-tests");
    } catch (error) {
      alert("Error Updating Test");
    }
  };

  return (
    <TeacherLayout>
      <div className="edit-test-page">
        <h1>Edit Test</h1>

        <input
          type="text"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        />

        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        {questions.map((question, index) => (
          <div key={index} className="edit-question-card">
            <h3>Question {index + 1}</h3>

            <input
              type="text"
              value={question.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
            />

            <input
              type="text"
              value={question.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(index, "correctAnswer", e.target.value)
              }
            />
          </div>
        ))}

        <button className="update-btn" onClick={saveChanges}>
          Save Changes
        </button>
      </div>
    </TeacherLayout>
  );
}

export default EditTest;
