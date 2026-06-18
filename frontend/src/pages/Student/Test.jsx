import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSingleTest,
  submitTest,
  checkSubmission,
} from "../../api/studentApi";
import "../../styles/test.css";

// Test component allows students to take a test
function Test() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [test, setTest] = useState(null);

  const [answers, setAnswers] = useState({});

  const [timeLeft, setTimeLeft] = useState(0);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));
        const status = await checkSubmission(studentInfo?.name, id);

        if (status.submitted) {
          alert("You have already submitted this test.");

          navigate("/available-tests");

          return;
        }

        const data = await getSingleTest(id);

        setTest(data);

        setTimeLeft(data.duration * 60);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTest();
  }, [id, navigate]);

  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;

    // Set up a timer to count down every second
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  // Function to handle answer changes for each question
  const handleAnswerChange = (question, answer) => {
    setAnswers({
      ...answers,
      [question]: answer,
    });
  };

  // Function to handle test submission
  const handleSubmit = async () => {
    if (submitted || !test) return;

    try {
      const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));

      const formattedAnswers = Object.entries(answers).map(
        ([question, answer]) => ({
          question,
          answer,
        }),
      );

      await submitTest({
        studentName: studentInfo?.name || "Unknown Student",

        testId: test._id,

        testName: test.testName,

        answers: formattedAnswers,
      });

      setSubmitted(true);

      alert("Test Submitted Successfully ✅");

      navigate("/student-dashboard");
    } catch (error) {
      console.log(error);

      alert("Error Submitting Test");
    }
  };

  // Effect to automatically submit the test when time runs out
  useEffect(() => {
    if (timeLeft === 0 && test && !submitted) {
      alert("Time is over. Test will be submitted automatically.");

      handleSubmit();
    }
  }, [timeLeft, test, submitted]);

  if (!test) return <h2>Loading...</h2>;

  return (
    <div className="test-page">
      <div className="test-header">
        <h1>{test.testName}</h1>

        <div className="timer-box">
          ⏰ Time Left
          <br />
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
      </div>

      {test.questions.map((question, index) => (
        <div key={index} className="question-card">
          <h3>Q{index + 1}</h3>

          <p>{question.question}</p>

          {question.type === "mcq" &&
            question.options.map((option, i) => (
              <label key={i} className="option-label">
                <input
                  type="radio"
                  name={`q${index}`}
                  value={option}
                  onChange={() => handleAnswerChange(question.question, option)}
                />

                {option}
              </label>
            ))}

          {question.type === "subjective" && (
            <textarea
              className="subjective-answer"
              placeholder="Write your answer here..."
              onChange={(e) =>
                handleAnswerChange(question.question, e.target.value)
              }
            />
          )}
        </div>
      ))}

      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={submitted}>
        {submitted ? "Submitted" : "Submit Test"}
      </button>
    </div>
  );
}

export default Test;
