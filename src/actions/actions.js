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
    .post("/auth/login", e)
    .then((res) => {
      console.log(res.data);
      window.localStorage.setItem("token", res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: LOGIN_FAIL, payload: err }));
};

export const LOGOUT_USER = "LOGOUT_USER";

// export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

// export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
  // dispatch({ type: LOGOUT_SUCCESS });
  // dispatch({ type: LOGOUT_FAIL });
};

export const SAVE_PIN = "SAVE_PIN";
export const SAVE_PIN_SUCCESS= "SAVE_PIN_SUCCESS";
export const SAVE_PIN_FAIL = "SAVE_PIN_FAIL";

export const savePin = () => (dispatch) => {
  dispatch({ type:SAVE_PIN});

}
export const GET_PINS = "GET_PINS";
export const GET_PINS_SUCCESS= "GET_PINS_SUCCESS";
export const GET_PINS_FAIL = "GET_PINS_FAIL";

export const getPins= () => (dispatch) => {
  dispatch({ type:GET_PINS});

}

export const UPDATE_PIN = "UPDATE_PIN";
export const UPDATE_PIN_SUCCESS= "UPDATE_PIN_SUCCESS";
export const UPDATE_PIN_FAIL = "UPDATE_PIN_FAIL";

export const updatePin = () => (dispatch) => {
  dispatch({ type:UPDATE_PIN});

}

export const DELETE_PIN = "DELETE_PIN";
export const DELETE_PIN_SUCCESS= "DELETE_PIN_SUCCESS";
export const DELETE_PIN_FAIL = "DELETE_PIN_FAIL";

export const deletePin = () => (dispatch) => {
  dispatch({ type:DELETE_PIN});
  
}

