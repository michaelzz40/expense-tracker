import {
  LOGIN,
  REGISTER,
  AUTH_LOADING,
  AUTH_SUCCESSFUL,
  AUTH_RESET,
  AUTH_ERROR,
  ATTACH_TOKEN
} from "./types";
import axios from "axios";

export const logUser = form => async dispatch => {
  try {
    dispatch({ type: AUTH_LOADING });
    const response = await axios.post(
      "https://register-login-api-final.herokuapp.com/api/users/login",
      form,
      {
        "Content-Type": "application/json"
      }
    );
    localStorage.setItem("token", response.data.token);
    dispatch({ type: LOGIN, payload: response.data });
    dispatch({ type: AUTH_SUCCESSFUL, payload: "Log in Successful" });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: "Error Logging in User" });
  }
};

export const registerUser = form => async dispatch => {
  try {
    dispatch({ type: AUTH_LOADING });
    const response = await axios.post(
      "https://register-login-api-final.herokuapp.com/api/users",
      form,
      {
        "Content-Type": "application/json"
      }
    );
    localStorage.setItem("token", response.data.token);
    dispatch({ type: REGISTER, payload: response.data });
    dispatch({ type: AUTH_SUCCESSFUL, payload: "Register user successful" });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: "Error Registering User" });
  }
};

export const authReset = () => dispatch => {
  dispatch({ type: AUTH_RESET });
};

export const attachToken = () => async dispatch => {
  dispatch({ type: AUTH_LOADING });
  let token = localStorage.getItem("token");
  if (!token) {
    return dispatch({ type: AUTH_SUCCESSFUL, payload: null });
  }
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(
      "https://register-login-api-final.herokuapp.com/api/users/profile"
    );
    dispatch({
      type: ATTACH_TOKEN,
      payload: {
        token,
        data: response.data
      }
    });
    dispatch({ type: AUTH_SUCCESSFUL, payload: null });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: "Error Fetching Token" });
  }
};
