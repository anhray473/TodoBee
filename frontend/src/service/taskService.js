import axios from "axios";

const API_URL = `${process.env.API_URL}/task`;

//Lấy tất cả task
export const getTask = () => axios.get(API_URL);

//Add a new task
export const addTask = (task) => axios.post(API_URL, task)