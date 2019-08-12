import axios from "axios";
import { LOGIN, LOGOUT, SIGNUP, GET_WRITER } from "./actionTypes";

const initialState = {
  writer: {},
  redirect: false,
  error: false,
};

export const login = (username, password) => {
  let data = axios
    .post("/api/login", { username, password })
    .then(res => res.data);
  return {
    type: LOGIN,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: axios.delete("/api/logout"),
  };
};

export const signup = (username, password) => {
  let data = axios
    .post("/api/signup", { username, password })
    .then(res => res.data);
  return {
    type: SIGNUP,
    payload: data,
  };
};

export const getWriter = () => {
  let data = axios.get("/api/writer").then(res => res.data);
  return {
    type: GET_WRITER,
    payload: data,
  };
};

export default function(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case LOGIN + "_FULFILLED":
      return {
        ...state,
        writer: payload,
        redirect: false,
        error: false,
      };
    case LOGIN + "_REJECTED":
      return { ...state, error: payload };
    case LOGOUT + "_FULFILLED":
      return { ...state, writer: {}, redirect: true, error: false };
    case SIGNUP + "_FULFILLED":
      return {
        ...state,
        redirect: false,
        writer: payload,
        error: false,
      };
    case SIGNUP + "_REJECTED":
      return { ...state, error: payload };
    case GET_WRITER + "_FULFILLED":
      return { ...state, writer: payload, error: false };
    case GET_WRITER + "_REJECTED":
      return { ...state, redirect: true, error: payload };
    default:
      return state;
  }
}
