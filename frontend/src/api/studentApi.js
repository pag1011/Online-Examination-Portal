import axios from "axios";

const API_URL = "http://localhost:5000/api/tests";

export const getTests = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

export const getSingleTest = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data;
};

export const submitTest = async (responseData) => {
  const response = await axios.post(
    "http://localhost:5000/api/results/submit",
    responseData,
  );

  return response.data;
};

export const checkSubmission = async (studentName, testId) => {
  const response = await axios.get(
    `http://localhost:5000/api/results/check/${studentName}/${testId}`,
  );

  return response.data;
};
