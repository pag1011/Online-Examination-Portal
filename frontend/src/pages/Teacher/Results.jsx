import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import TeacherLayout from "../../layouts/TeacherLayout";
import "../../styles/result.css";
import { generateResults, getResults } from "../../api/teacherApi";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Results component allows teachers to view and manage the results of their tests
function Results() {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    try {
      const data = await getResults();

      setResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // Function to generate results for all tests
  const handleGenerate = async () => {
    try {
      await generateResults();

      await fetchResults();

      alert("Results Generated Successfully ✅");
    } catch (error) {
      alert("Error Generating Results");
    }
  };

  // Function to download the results as a PDF report
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Online Examination Results", 14, 15);

    // Prepare table data for the PDF
    const tableData = results.map((result) => [
      result.studentName,
      result.testName,
      result.correctAnswers,
      result.incorrectAnswers,
      result.percentage.toFixed(2) + "%",
      result.aiScore || 0,
      result.aiFeedback || "-",
    ]);

    autoTable(doc, {
      startY: 25,

      head: [
        [
          "Student",
          "Test",
          "Correct",
          "Incorrect",
          "Percentage",
          "AI Score",
          "Feedback",
        ],
      ],

      body: tableData,
    });

    doc.save("Results_Report.pdf");
  };

  // Function to determine performance based on percentage
  const getPerformance = (percentage) => {
    if (percentage >= 80) return "Excellent";

    if (percentage >= 50) return "Good";

    return "Needs Improvement";
  };

  // Group results by test name for better organization
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.testName]) {
      acc[result.testName] = [];
    }

    acc[result.testName].push(result);

    return acc;
  }, {});

  return (
    <TeacherLayout>
      <div className="results-page">
        <div className="results-header">
          <h1>Results Dashboard</h1>

          <button className="generate-btn" onClick={handleGenerate}>
            Generate Results
          </button>

          <button className="download-btn" onClick={downloadPDF}>
            📥 Download PDF
          </button>
        </div>
        {/* Display results grouped by test name */}
        {results.length === 0 ? (
          <div className="no-results">No Results Found</div>
        ) : (
          Object.keys(groupedResults).map((testName) => (
            <div key={testName} className="test-group">
              <h1 className="test-heading">📘 {testName}</h1>

              {groupedResults[testName].map((result) => {
                const chartData = {
                  labels: ["Correct", "Incorrect"],

                  datasets: [
                    {
                      data: [result.correctAnswers, result.incorrectAnswers],
                      backgroundColor: ["#22c55e", "#ef4444"],
                      borderColor: ["#16a34a", "#dc2626"],
                      borderWidth: 1,
                    },
                  ],
                };

                return (
                  <div key={result._id} className="result-card">
                    <div className="result-info">
                      <h2>{result.studentName}</h2>

                      <p>
                        <strong>Correct:</strong> {result.correctAnswers}
                      </p>
                      <p>
                        <strong>Incorrect:</strong> {result.incorrectAnswers}
                      </p>
                      <p>
                        <strong>Percentage:</strong>{" "}
                        {result.percentage.toFixed(2)}%
                      </p>
                      <p
                        className={
                          result.percentage >= 80
                            ? "excellent"
                            : result.percentage >= 50
                              ? "good"
                              : "poor"
                        }>
                        {getPerformance(result.percentage)}
                      </p>

                      {result.aiFeedback && (
                        <div className="ai-box">
                          <h3>🤖 Subjective Evaluation</h3>

                          <p>
                            <strong>AI Score:</strong> {result.aiScore}/10
                          </p>

                          <div className="feedback-box">
                            <strong>Feedback:</strong>

                            <p>{result.aiFeedback}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="chart-container">
                      <Pie data={chartData} />
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </TeacherLayout>
  );
}

export default Results;
