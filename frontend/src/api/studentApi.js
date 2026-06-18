import axios from "axios";
import { API_URL } from "../config";

const TEST_API = `${API_URL}/api/tests`;

export const getTests = async () => {
  const response = await axios.get(TEST_API);

  return response.data;
};

export const getSingleTest = async (id) => {
  const response = await axios.get(
    `${TEST_API}/${id}`
  );

  return response.data;
};

export const submitTest = async (responseData) => {
  const response = await axios.post(
    `${API_URL}/api/results/submit`,
    responseData
  );

  return response.data;
};

export const checkSubmission = async (
  studentName,
  testId
) => {
  const response = await axios.get(
    `${API_URL}/api/results/check/${studentName}/${testId}`
  );

  return response.data;
};