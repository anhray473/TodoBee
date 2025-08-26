import axios from "axios";

const API_URL = `${process.env.API_URL}/list`;

//Lấy tất cả task
export const getList = () => axios.get(API_URL);

//Add a new task
export const addList = (list) => axios.post(API_URL, list)