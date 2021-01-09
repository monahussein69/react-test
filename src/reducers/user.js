import { SUBSCRIBE_SUCCESS, SUBSCRIBE_FAIL } from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isSubscribed: false, user }
  : { isSubscribed: false, user: null };

export default function(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case SUBSCRIBE_SUCCESS:
      return {
        ...state,
        isSubscribed: true
      };
    case SUBSCRIBE_FAIL:
      return {
        ...state,
        isSubscribed: false
      };

    default:
      return state;
  }
}
