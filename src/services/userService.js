import axios from "axios";

const registerNewUser = (email, phoneNumber, username, password) => {
  return axios.post("http://localhost:8080/api/v1/register", {
    email,
    phoneNumber,
    username,
    password,
  });
};

export { registerNewUser };
