import { SUBSCRIBE_SUCCESS, SUBSCRIBE_FAIL, SET_MESSAGE } from "./types";

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
