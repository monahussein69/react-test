import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE
} from "./types";

import adminAuthService from "../services/admin/auth.service";
import userAuthService from "../services/user/auth.service";

export const adminRegister = (username, email, password) => dispatch => {
  return adminAuthService.register(username, email, password).then(
    response => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.user
      });

      return Promise.resolve();
    },
    error => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    }
  );
};

export const adminLogin = (email, password) => dispatch => {
  return adminAuthService.login(email, password).then(
    data => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.user
      });

      return Promise.resolve();
    },
    error => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    }
  );
};

export const userRegister = (username, email, password) => dispatch => {
  return userAuthService.register(username, email, password).then(
    response => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.user
      });

      return Promise.resolve();
    },
    error => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    }
  );
};

export const userLogin = (email, password) => dispatch => {
  return userAuthService.login(email, password).then(
    data => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.user
      });

      return Promise.resolve();
    },
    error => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    }
  );
};

export const logout = () => dispatch => {
  userAuthService.logout();

  dispatch({
    type: LOGOUT
  });
};
