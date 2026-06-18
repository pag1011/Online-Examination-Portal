import axios from "axios";
import { API_URL } from "../config";

const TEACHER_API = `${API_URL}/api/teachers`;

export const teacherLogin = async (loginData) => {
  const response = await axios.post(`${TEACHER_API}/login`, loginData);

  return response.data;
};

export const uploadNote = async (noteData) => {
  const response = await axios.post(
    `${API_URL}/api/notes/upload`,
    noteData,
  );

  return response.data;
};

export const createTest = async (testData) => {
  const response = await axios.post(
    `${API_URL}/api/tests/create`,
    testData,
  );

  return response.data;
};

export const updateTest = async (id, testData) => {
  const response = await axios.put(
    `${API_URL}/api/tests/${id}`,
    testData,
  );

  return response.data;
};

export const generateResults = async () => {
  const response = await axios.post(
    `${API_URL}/api/results/generate`,
  );

  return response.data;
};

export const getResults = async () => {
  const response = await axios.get(`${API_URL}/api/results`);

  return response.data;
};
