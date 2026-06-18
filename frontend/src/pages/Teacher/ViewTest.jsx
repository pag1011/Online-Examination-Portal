import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeacherLayout from "../../layouts/TeacherLayout";
import axios from "axios";
import "../../styles/viewTest.css";
import { API_URL } from "../../config";

// ViewTest component allows teachers to view the details of a specific test, including its questions and answers
function ViewTest() {
  const { id } = useParams();

  const [test, setTest] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
      const response = await axios.get(`${API_URL}/api/tests/${id}`);

      setTest(response.data);
    };

    fetchTest();
  }, [id]);

  if (!test) {
    return <h2>Loading...</h2>;
  }

  // Calculate the total marks for the test by summing up the marks of all questions
  const totalMarks = test.questions.reduce(
    (sum, q) => sum + Number(q.marks || 0),
    0,
  );

  return (
    <TeacherLayout>
      <div className="view-test-page">
        <div className="test-header">
          <h1>📝 {test.testName}</h1>

          <div className="test-info">
            <span className="info-badge">📚 {test.subject}</span>

            <span className="info-badge">⏰ {test.duration} Minutes</span>

            <span className="info-badge">
              ❓ {test.questions.length} Questions
            </span>

            <span className="info-badge">🎯 {totalMarks} Marks</span>
          </div>
        </div>

        {test.questions.map((question, index) => (
          <div key={index} className="question-card">
            <h3 className="question-title">
              Q{index + 1}. {question.question}
            </h3>

            {question.type === "mcq" && (
              <>
                {question.options.map((option, i) => (
                  <div key={i} className="option">
                    {option}
                  </div>
                ))}

                <div className="correct-answer">
                  ✅ Correct Answer: {question.correctAnswer}
                </div>
              </>
            )}

            {question.type === "subjective" && (
              <div className="correct-answer">
                Expected Answer: {question.correctAnswer}
              </div>
            )}

            <div className="question-footer">
              <span className="type-badge">{question.type}</span>

              <span className="marks-badge">{question.marks} Marks</span>
            </div>
          </div>
        ))}
      </div>
    </TeacherLayout>
  );
}

export default ViewTest;
