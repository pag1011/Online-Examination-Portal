import axios from "axios";

const API_URL = "http://localhost:5000/api/teachers";

export const teacherLogin = async (loginData) => {
  const response = await axios.post(`${API_URL}/login`, loginData);

  return response.data;
};

export const uploadNote = async (noteData) => {
  const response = await axios.post(
    "http://localhost:5000/api/notes/upload",
    noteData,
  );

  return response.data;
};

export const createTest = async (testData) => {
  const response = await axios.post(
    "http://localhost:5000/api/tests/create",
    testData,
  );

  return response.data;
};

export const updateTest = async (id, testData) => {
  const response = await axios.put(
    `http://localhost:5000/api/tests/${id}`,
    testData,
  );

  return response.data;
};

export const generateResults = async () => {
  const response = await axios.post(
    "http://localhost:5000/api/results/generate",
  );

  return response.data;
};

export const getResults = async () => {
  const response = await axios.get("http://localhost:5000/api/results");

  return response.data;
};
