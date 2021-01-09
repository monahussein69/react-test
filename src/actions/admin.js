import {
  HELPER_ADDED,
  HELPER_FAIL,
  SET_MESSAGE,
  ROLES_RETURNED,
  ROLES_FAIL,
  USERS_RETURNED,
  USERS_FAIL,
  ADMINS_RETURNED,
  ADMINS_FAIL
} from "./types";

import AdminService from "../services/admin/admin.service";

export const addAdminHelps = (username, email, password, role) => dispatch => {
  return AdminService.addAdminHelps(username, email, password, role).then(
    response => {
      dispatch({
        type: HELPER_ADDED
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message
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
        type: HELPER_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    }
  );
};

export const getRoles = () => dispatch => {
  return AdminService.getRoles().then(
    response => {
      dispatch({
        type: ROLES_RETURNED,
        payload: response.data
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
        type: ROLES_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    }
  );
};

export const getAdmins = () => dispatch => {
  return AdminService.getAdmins().then(
    response => {
      console.log(response);
      dispatch({
        type: ADMINS_RETURNED,
        payload: response.data
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
        type: ADMINS_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    }
  );
};

export const getAdminUsers = () => dispatch => {
  return AdminService.getAdminUsers().then(
    response => {
      dispatch({
        type: USERS_RETURNED,
        payload: response.data
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
        type: USERS_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    }
  );
};
