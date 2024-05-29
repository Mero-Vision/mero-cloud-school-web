import axios from "axios";

export const fetchTodosApi = () => {
  return axios.get("https://jsonplaceholder.typicode.com/todos");
};
export const fetchSingleTodosApi = (data) => {
  console.log({ data });
  return axios.get(`https://jsonplaceholder.typicode.com/todos/${data?.id}`);
};
export const postTodosApi = (data) => {
  return axios.post("https://jsonplaceholder.typicode.com/todos", data);
};
