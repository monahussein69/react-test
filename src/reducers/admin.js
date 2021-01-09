import {
  HELPER_ADDED,
  HELPER_FAIL,
  ROLES_RETURNED,
  USERS_RETURNED,
  USERS_FAIL,
  ADMINS_RETURNED,
  ADMINS_FAIL
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isAdded: false, user, roles: [], adminUsers: [], admins: [] }
  : { isAdded: false, user: null, roles: [], adminUsers: [], admins: [] };

export default function(state = initialState, action) {
  const { type, payload } = action;

  console.log(type);

  switch (type) {
    case HELPER_ADDED:
      return {
        ...state,
        isAdded: true
      };
    case HELPER_FAIL:
      return {
        ...state,
        isAdded: false
      };

    case ROLES_RETURNED:
      return {
        ...state,
        roles: payload.roles
      };

    case ADMINS_RETURNED:
      return {
        ...state,
        admins: payload.admins
      };

    case ADMINS_FAIL:
      return {
        ...state
      };

    case USERS_RETURNED:
      return {
        ...state,
        adminUsers: payload.users
      };

    case USERS_FAIL:
      return {
        ...state
      };

    default:
      return state;
  }
}
