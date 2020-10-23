import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../actions/actions";
const initialState = {
  data: [],
  isLoggedIn: false,
};
export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        errors: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
