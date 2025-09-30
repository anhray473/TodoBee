import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/list`;

//Lấy tất cả list`
export const getList = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const getTaskByList = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    // console.log(res.data);
    return res.data.tasks;
}

//Add a new list
export const addList = (list) => axios.post(API_URL, list)

//Delete list
export const deleteList = (id) => axios.delete(`${API_URL}/${id}`)