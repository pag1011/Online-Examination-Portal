import { useEffect, useState } from "react";
import TeacherLayout from "../../layouts/TeacherLayout";
import axios from "axios";
import "../../styles/analytics.css";

// Analytics component displays the analytics dashboard for teachers
function Analytics() {
  const [analytics, setAnalytics] = useState({
    totalTests: 0,
    totalResults: 0,
    averageScore: 0,
    highestScore: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const tests = await axios.get("http://localhost:5000/api/tests");

        const results = await axios.get("http://localhost:5000/api/results");

        const percentages = results.data.map((r) => r.percentage);

        const average = percentages.length ? (
          percentages.reduce((a, b) => a + b, 0) / percentages.length).toFixed(2) : 0;

        const highest = percentages.length ? Math.max(...percentages) : 0;

        setAnalytics({
          totalTests: tests.data.length,

          totalResults: results.data.length,

          averageScore: average,

          highestScore: highest,
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  return (
    <TeacherLayout>
      <div className="analytics-page">
        <h1 className="analytics-title">📊 Analytics Dashboard</h1>

        <div className="analytics-grid">
          <div className="analytics-cardblue">
            <h3>Total Tests</h3>

            <h1>{analytics.totalTests}</h1>
          </div>

          <div className="analytics-cardgreen">
            <h3>Total Results</h3>

            <h1>{analytics.totalResults}</h1>
          </div>

          <div className="analytics-cardorange">
            <h3>Average Score</h3>

            <h1>{analytics.averageScore}%</h1>
          </div>

          <div className="analytics-cardpurple">
            <h3>Highest Score</h3>

            <h1>{analytics.highestScore}%</h1>
          </div>
        </div>

        <div className="analytics-footer">
          <h2>📈 Performance Overview</h2>

          <p>
            This dashboard provides a quick overview of tests, student results,
            average performance and highest score achieved in the examination
            system.
          </p>
        </div>
      </div>
    </TeacherLayout>
  );
}

export default Analytics;