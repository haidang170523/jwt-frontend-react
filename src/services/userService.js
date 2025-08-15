import axios from "../setup/axios";

const registerNewUser = (email, phoneNumber, username, password) => {
  // In this case: Don't declare key in key: value => user value as a key by default
  return axios.post("/api/v1/register", {
    email,
    phoneNumber,
    username,
    password,
  });
};

const loginUser = (valueLogin, password) => {
  return axios.post("/api/v1/login", {
    valueLogin,
    password,
  });
};

const logoutUser = () => {
  return axios.post("/api/v1/logout");
};

const fetchAllUsers = (page, limit) => {
  return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (id) => {
  return axios.delete("/api/v1/user/delete", {
    data: { id: id },
  });
};

const fetchAllGroups = () => {
  return axios.get(`/api/v1/group/read`);
};

const createNewUser = (userData) => {
  return axios.post("/api/v1/user/create", userData);
};

const updateUser = (userData) => {
  return axios.put("/api/v1/user/update", userData);
};

const getUserInfor = () => {
  return axios.get("/api/v1/account");
};

export {
  registerNewUser,
  loginUser,
  logoutUser,
  fetchAllUsers,
  deleteUser,
  fetchAllGroups,
  createNewUser,
  updateUser,
  getUserInfor,
};
