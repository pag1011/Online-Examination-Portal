import { useState } from "react";
import TeacherLayout from "../../layouts/TeacherLayout";
import { createTest } from "../../api/teacherApi";
import "../../styles/createTest.css";

// CreateTest component allows teachers to create a new test
function CreateTest() {
  const teacherInfo = JSON.parse(localStorage.getItem("teacherInfo"));

  const [testName, setTestName] = useState("");

  const [subject, setSubject] = useState("");

  const [duration, setDuration] = useState("");

  const [questions, setQuestions] = useState([
    {
      question: "",
      type: "mcq",
      options: ["", "", "", ""],
      correctAnswer: "",
      marks: 1,
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        type: "mcq",
        options: ["", "", "", ""],
        correctAnswer: "",
        marks: 1,
      },
    ]);
  };

  const deleteQuestion = (index) => {
    if (questions.length === 1) {
      alert("At least one question is required");
      return;
    }

    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];

    updated[index][field] = value;

    setQuestions(updated);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updated = [...questions];

    updated[questionIndex].options[optionIndex] = value;

    setQuestions(updated);
  };

  const saveTest = async () => {
    try {
      await createTest({
        testName,
        subject,
        duration,
        questions,
        createdBy: teacherInfo?.name,
      });

      alert("Test Created Successfully");
    } catch (error) {
      alert("Error Creating Test");
    }
  };

  return (
    <TeacherLayout>
      <div className="create-test-container">
        <h1>Create Test</h1>

        <div className="test-header">
          <input
            type="text"
            placeholder="Test Name"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <input
            type="number"
            placeholder="Duration (Minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        {questions.map((q, index) => (
          <div key={index} className="question-card">
            <div className="question-top">
              <h3>Question {index + 1}</h3>

              <button className="delete-btn"
                onClick={() => deleteQuestion(index)}>
                Delete
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter Question"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
            />

            <select
              value={q.type}
              onChange={(e) =>
                handleQuestionChange(index, "type", e.target.value)
              }>
              <option value="mcq">MCQ</option>

              <option value="subjective">Subjective</option>
            </select>

            {q.type === "mcq" && (
              <div className="option-grid">
                <input
                  type="text"
                  placeholder="Option A"
                  onChange={(e) => handleOptionChange(index, 0, e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Option B"
                  onChange={(e) => handleOptionChange(index, 1, e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Option C"
                  onChange={(e) => handleOptionChange(index, 2, e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Option D"
                  onChange={(e) => handleOptionChange(index, 3, e.target.value)}
                />
              </div>
            )}

            <input
              type="text"
              placeholder={
                q.type === "subjective" ? "Expected Answer" : "Correct Answer"
              }
              value={q.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(index, "correctAnswer", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Marks"
              value={q.marks}
              onChange={(e) =>
                handleQuestionChange(index, "marks", e.target.value)
              }
            />
          </div>
        ))}

        <div className="action-buttons">
          <button className="add-btn" onClick={addQuestion}>
            Add Question
          </button>

          <button className="save-btn" onClick={saveTest}>
            Save Test
          </button>
        </div>
      </div>
    </TeacherLayout>
  );
}

export default CreateTest;
