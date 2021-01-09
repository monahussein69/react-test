import axios from "axios";
import authHeader from "../auth-header";

const API_URL = "http://localhost:8080/api/user/";

const getUserProfile = () => {
  return axios.get(API_URL + "profile", { headers: authHeader() });
};

const subscribeToStore = stores => {
  return axios.post(
    API_URL + "subscribe_to_store",
    {
      stores
    },
    { headers: authHeader() }
  );
};

export default {
  getUserProfile,
  subscribeToStore
};
