import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  return axios
    .post(API_URL + "signup", {
      username,
      email,
      password
    })
    .then(response => {
      if (response.data.user.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password
    })
    .then(response => {
      if (response.data.user.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const userAuthService = {
  register,
  login,
  logout
};
export default userAuthService;
