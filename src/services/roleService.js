import axios from "../setup/axios";

const createRoles = (roles) => {
  return axios.post("/api/v1/role/create", roles);
};

const fetchAllRoles = () => {
  return axios.get(`/api/v1/role/read`);
};

const deleteRole = (id) => {
  return axios.delete("/api/v1/role/delete", {
    data: { id: id },
  });
};

export { createRoles, fetchAllRoles, deleteRole };
