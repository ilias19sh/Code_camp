import axios from "axios";

export const getUsers = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/temoinx/users/");
    return response.data;
  };
  export const getUserById = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/v1/temoinx/users/${id}`);
    return response.data;
  };
  export const PostUser = async (userData) => {
    const response = await axios.post("http://localhost:3000/api/v1/temoinx/users/", userData);
    return response.data;
  };
  export const updateUser = async (id, userData) => {
    const response = await axios.put(`http://localhost:3000/api/v1/temoinx/users/${id}`, userData);
    return response.data;
  };


  export const getSignalements = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/temoinx/signalement/");
    return response.data;
  };
  export const getSignalementById = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/v1/temoinx/signalement/${id}`);
    return response.data;
  };
  export const PostSignalement = async (signalementData) => {
    const response = await axios.post("http://localhost:3000/api/v1/temoinx/signalement/", signalementData);
    return response.data;
  };
  export const updateSignalement = async (id, signalementData) => {
    const response = await axios.put(`http://localhost:3000/api/v1/temoinx/signalement/${id}`, signalementData);
    return response.data;
  };