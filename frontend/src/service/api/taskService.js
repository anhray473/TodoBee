import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/task`;

//Lấy tất cả task
export const getTask = () => axios.get(API_URL);

export const getTaskByList = async (id) => {
    const res = await axios.get(`${API_URL}/list/${id}`);
    return res.data;
}

//Add a new task
export const addTask = (task) => axios.post(API_URL, task)

//Update task
export const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task)

//delete task
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`)

//updateTonggle
export const toggleTask = (id) => axios.patch(`${API_URL}/${id}/toggle`)