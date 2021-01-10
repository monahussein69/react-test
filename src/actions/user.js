import {
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAIL,
  SET_MESSAGE,
  LOGIN_SUCCESS
} from "./types";

import UserService from "../services/user/user.service";

export const subscribeToStore = stores => dispatch => {
  return UserService.subscribeToStore(stores).then(
    response => {
      dispatch({
        type: SUBSCRIBE_SUCCESS
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message
      });
      if (response.data.user) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data.user
        });
      }

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
        type: SUBSCRIBE_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    }
  );
};
