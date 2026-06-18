import { useEffect, useState } from "react";
import TeacherLayout from "../../layouts/TeacherLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/manageTests.css";
import { API_URL } from "../../config";

// ManageTests component allows teachers to view, search, and manage their created tests
function ManageTests() {
  const [tests, setTests] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [subjectFilter, setSubjectFilter] = useState("All");

  const fetchTests = async () => {
    const response = await axios.get(`${API_URL}/api/tests`);

    setTests(response.data);
  };

  useEffect(() => {
    fetchTests();
  }, []);

  // Function to delete a test by its ID
  const deleteTest = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this test?",
    );

    if (!confirmDelete) return;

    await axios.delete(`${API_URL}/api/tests/${id}`);

    alert("Test Deleted Successfully");

    fetchTests();
  };

  // Extract unique subjects from the tests for filtering
  const subjects = ["All", ...new Set(tests.map((test) => test.subject))];

  // Filter tests based on search term and selected subject
  const filteredTests = tests.filter((test) => {
    const matchesSearch = test.testName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesSubject =
      subjectFilter === "All" ? true : test.subject === subjectFilter;

    return matchesSearch && matchesSubject;
  });

  return (
    <TeacherLayout>
      <div className="manage-header">
        <h1>📝 Manage Tests</h1>

        <p>View, search and manage all created tests</p>
      </div>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search Test..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="subject-filter">
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="tests-container">
        {filteredTests.length === 0 ? (
          <div className="no-tests">No Tests Found</div>
        ) : (
          filteredTests.map((test) => {
            const totalMarks = test.questions.reduce(
              (sum, q) => sum + Number(q.marks || 0),
              0,
            );

            return (
              <div key={test._id} className="test-card">
                <h2>{test.testName}</h2>

                <p>
                  <strong>Subject:</strong> {test.subject}
                </p>
                <p>
                  <strong>Duration:</strong> {test.duration} Minutes
                </p>
                <p>
                  <strong>Questions:</strong> {test.questions.length}
                </p>
                <p>
                  <strong>Total Marks:</strong> {totalMarks}
                </p>
                <p>
                  <strong>Created By:</strong> {test.createdBy}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(test.createdAt).toLocaleDateString()}
                </p>

                <div className="btn-group">
                  <Link to={`/view-test/${test._id}`}>
                    <button className="view-btn">View Test</button>
                  </Link>

                  <Link to={`/edit-test/${test._id}`}>
                    <button className="view-btn">Edit Test</button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTest(test._id)}>
                    Delete Test
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </TeacherLayout>
  );
}

export default ManageTests;
