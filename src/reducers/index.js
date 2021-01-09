import { combineReducers } from "redux";
import auth from "./auth";
import admin from "./admin";
import user from "./user";
import message from "./message";

export default combineReducers({
  auth,
  message,
  admin,
  user
});
