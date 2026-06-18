import { useEffect, useState } from "react";
import { getTests, checkSubmission } from "../../api/studentApi";
import { Link } from "react-router-dom";
import "../../styles/availableTests.css";
import Footer from "../../components/Footer";

// This component fetches the available tests for a student and checks if the student has already submitted any of them.
// It displays the tests in a grid format, showing relevant information such as the subject, duration, and number of questions.
// If a test has already been submitted, it disables the start button and indicates that the test has been completed.
function AvailableTests() {
  const [tests, setTests] = useState([]);

  const [submittedTests, setSubmittedTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await getTests();
        setTests(data);

        const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));

        const submitted = [];

        for (const test of data) {
          const status = await checkSubmission(studentInfo.name, test._id);

          if (status.submitted) {
            submitted.push(test._id);
          }
        }

        setSubmittedTests(submitted);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTests();
  }, []);

  return (
    <>
      <div className="available-tests-page">
        <h1 className="available-title">📝 Available Tests</h1>

        {tests.length === 0 ? (
          <div className="no-tests">No Tests Available</div>
        ) : (
          <div className="tests-grid">
            {tests.map((test) => {
              const alreadySubmitted = submittedTests.includes(test._id);

              return (
                <div key={test._id} className="test-card">
                  <h2>{test.testName}</h2>

                  <div className="badges">
                    <span className="subject-badge">📚 {test.subject}</span>

                    <span className="duration-badge">
                      ⏰ {test.duration} Min
                    </span>

                    <span className="question-badge">
                      ❓ {test.questions.length} Questions
                    </span>
                  </div>

                  {alreadySubmitted ? (
                    <button className="submitted-btn" disabled>
                      ✅ Already Submitted
                    </button>
                  ) : (
                    <Link to={`/test/${test._id}`}>
                      <button className="start-btn">🚀 Start Test</button>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default AvailableTests;
