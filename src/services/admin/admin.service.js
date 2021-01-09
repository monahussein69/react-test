import axios from "axios";
import authHeader from "../auth-header";

const API_URL = "http://localhost:8080/api/admin/";

const getAdminProfile = () => {
  return axios.get(API_URL + "profile", { headers: authHeader() });
};

const addAdminHelps = (username, email, password, role) => {
  return axios.post(
    API_URL + "addAdminHelps",
    {
      username,
      email,
      password,
      role
    },
    { headers: authHeader() }
  );
};

const getAdminUsers = () => {
  return axios.get(API_URL + "getAdminUsers", { headers: authHeader() });
};

const getRoles = () => {
  return axios.get(API_URL + "getRoles");
};

const getAdmins = () => {
  return axios.get(API_URL + "getAdmins");
};

export default {
  getAdminProfile,
  addAdminHelps,
  getAdminUsers,
  getRoles,
  getAdmins
};
