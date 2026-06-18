import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { jsPDF } from "jspdf";
import "../../styles/myResults.css";
import Footer from "../../components/Footer";

ChartJS.register(ArcElement, Tooltip, Legend);

// This component fetches the results of a student and displays them in a grid format.
function MyResults() {
  const [results, setResults] = useState([]);
  const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/results/student/${studentInfo.name}`,
        );

        setResults(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResults();
  }, []);

  // Function to download the certificate as a PDF
  const downloadCertificate = (result) => {
    const doc = new jsPDF();

    doc.setFontSize(24);
    doc.text("Certificate of Achievement", 35, 30);

    doc.setFontSize(16);
    doc.text("This certifies that", 75, 55);

    doc.setFontSize(22);
    doc.text(studentInfo.name, 65, 75);

    doc.setFontSize(16);
    doc.text("has successfully completed", 55, 95);

    doc.setFontSize(18);
    doc.text(result.testName, 65, 115);

    doc.setFontSize(16);
    doc.text(`Score : ${result.percentage.toFixed(2)}%`, 70, 140);
    doc.text(`Date : ${new Date().toLocaleDateString()}`, 70, 155);
    doc.save(`${result.testName}-Certificate.pdf`);
  };

  return (
    <>
      <div className="results-container">
        <h1 className="results-title">📊 My Results</h1>

        {results.length === 0 ? (
          <div className="no-results">No Results Found</div>
        ) : (
          <div className="result-grid">
            {results.map((result) => {
              const chartData = {
                labels: ["Correct", "Incorrect"],

                datasets: [
                  {
                    data: [result.correctAnswers, result.incorrectAnswers],

                    backgroundColor: ["#22c55e", "#ef4444"],

                    borderWidth: 1,
                  },
                ],
              };

              return (
                <div key={result._id} className="result-card">
                  <div className="result-left">
                    <h2>{result.testName}</h2>

                    <p>
                      <strong>Percentage:</strong>{" "}
                      {result.percentage.toFixed(2)}%
                    </p>

                    <p>
                      <strong>Correct:</strong> {result.correctAnswers}
                    </p>

                    <p>
                      <strong>Incorrect:</strong> {result.incorrectAnswers}
                    </p>

                    {result.percentage >= 40 ? (
                      <p className="pass-status">Passed ✅</p>
                    ) : (
                      <p className="fail-status">Failed ❌</p>
                    )}

                    {result.aiFeedback && (
                      <div className="ai-box">
                        <h3>🤖 AI Evaluation</h3>

                        <p>
                          <strong>AI Score:</strong> {result.aiScore}/10
                        </p>

                        <p>
                          <strong>Feedback:</strong>
                        </p>

                        <p>{result.aiFeedback}</p>
                      </div>
                    )}

                    <button
                      className="certificate-btn"
                      onClick={() => downloadCertificate(result)}>
                      🏆 Download Certificate
                    </button>
                  </div>

                  <div className="student-chart">
                    <Pie data={chartData} />
                  </div>
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

export default MyResults;
