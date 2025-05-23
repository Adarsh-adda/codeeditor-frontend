import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "https://codeeditor.draknow.me/api",
});

export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute/", {
    language: language,
    source_code: sourceCode,
  });

  // Direct response data structure (no run nested property)
  return {
    output: response.data.run.output,
    stderr: response.data.run.stderr,
    execution_time: response.data.run.execution_time,
  };
};
