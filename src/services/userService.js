import axios from "axios";

const registerNewUser = (email, phoneNumber, username, password) => {
  // In this case: Don't declare key in key: value => user value as a key by default
  return axios.post("http://localhost:8080/api/v1/register", {
    email,
    phoneNumber,
    username,
    password,
  });
};

const loginUser = (valueLogin, password) => {
  return axios.post("http://localhost:8080/api/v1/login", {
    valueLogin,
    password,
  });
};

const fetchAllUsers = (page, limit) => {
  return axios.get(
    `http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`
  );
};

const deleteUser = (id) => {
  return axios.delete("http://localhost:8080/api/v1/user/delete", {
    data: { id: id },
  });
};

const fetchAllGroups = () => {
  return axios.get(`http://localhost:8080/api/v1/group/read`);
};

const createNewUser = (userData) => {
  return axios.post("http://localhost:8080/api/v1/user/create", userData);
};

const updateUser = (userData) => {
  return axios.put("http://localhost:8080/api/v1/user/update", userData);
};

export {
  registerNewUser,
  loginUser,
  fetchAllUsers,
  deleteUser,
  fetchAllGroups,
  createNewUser,
  updateUser,
};
