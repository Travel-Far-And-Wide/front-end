import axiosAuth from "../utils/axiosAuth";
import axios from "axios";

export const REGISTER_USER = "REGISTER_USER";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const REGISTER_FAIL = "REGISTER_FAIL";
export const registerNewUser = (e) => (dispatch) => {
  dispatch({ type: REGISTER_USER });
  axios
    .post("http://localhost:4000/auth/register", e)
    .then((res) => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: REGISTER_FAIL, payload: err }));
};

export const LOGIN_USER = "LOGIN_USER";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const LOGIN_FAIL = "LOGIN_FAIL";

export const loginUser = (e) => (dispatch) => {
  dispatch({ type: LOGIN_USER });
  axiosAuth()
    .post("http://localhost:4000/auth/login", e)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: LOGIN_FAIL, payload: err }));
};
