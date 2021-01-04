import {
  LOGIN,
  REGISTER,
  AUTH_LOADING,
  AUTH_RESET,
  AUTH_SUCCESSFUL,
  ATTACH_TOKEN,
  AUTH_ERROR
} from "../actions/types";

const initialState = {
  userId: "",
  username: "",
  email: "",
  token: "",
  authLoading: false,
  authMessage: "",
  errorMessage: ""
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.firstName + " " + action.payload.lastName,
        token: action.payload.token,
        email: action.payload.email
      };
    case LOGIN:
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.firstName + " " + action.payload.lastName,
        token: action.payload.token,
        email: action.payload.email
      };
    case AUTH_LOADING:
      return {
        ...state,
        authLoading: true
      };
    case AUTH_SUCCESSFUL:
      return {
        ...state,
        authLoading: false,
        authMessage: action.payload
      };
    case AUTH_ERROR:
      return {
        ...state,
        authLoading: false,
        authMessage: action.payload
      };
    case AUTH_RESET:
      return {
        userId: "",
        username: "",
        token: "",
        authLoading: false,
        authMessage: "",
        errorMessage: "",
        email: ""
      };
    case ATTACH_TOKEN:
      return {
        ...state,
        userId: action.payload.data.userId,
        username:
          action.payload.data.firstName + " " + action.payload.data.lastName,
        email: action.payload.data.email,
        token: action.payload.token
      };
    default:
      return {
        ...state
      };
  }
};
