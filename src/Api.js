// Api call here
import axios from 'axios';

const ROOT_URL = import.meta.env.VITE_API_URL;


const user=JSON.parse(localStorage.getItem("user"));
// header for sending token
const authorize = {
    headers: { Authorization:`Bearer ${user?.token}` }
    }

export const getAllTasks = async () => {
    return await axios.get(`${ROOT_URL}/api/task/user/${user.id}`, authorize);
}

// add task api to db
export const addTask=async (data)=>{
     return await axios.post(`${ROOT_URL}/api/task/`,data,authorize);
}
// update task
export const updateTask=async (data,id)=>{
    return await axios.put(`${ROOT_URL}/api/task/${id}`,data,authorize)
}
// delete Task
export const deleteTask=async (id)=>{
    return await axios.delete(`${ROOT_URL}/api/task/${id}`,authorize)
}

// register user
export const register=async (data)=>{
    return await axios.post(`${ROOT_URL}/api/auth/register`,data);
}
// login api
export const loginUser=async (data)=>{
    return await axios.post(`${ROOT_URL}/api/auth/login`,data);
}


// project Api
export const addProject=async (data)=>{
    return await axios.post(`${ROOT_URL}/project/${user?.id}`,data,authorize);
}
export const getProjects=async ()=>{
    return await axios.get(`${ROOT_URL}/project/${user?.id}`,authorize);
}

export const updateProject=async (data,id)=>{
    return await axios.put(`${ROOT_URL}/project/${id}`,data,authorize);
}
export const deleteProject=async (id)=>{
    return await axios.delete(`${ROOT_URL}/project/${id}`,authorize);
}