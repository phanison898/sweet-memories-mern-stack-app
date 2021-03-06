import * as api from "../api";
import { v4 as uuid } from "uuid";

export const SignUp = (signUpData) => async (dispatch) => {
  try {
    let responseData;
    try {
      const { data } = await api.SignUp(signUpData);
      responseData = await data;
    } catch (error) {
      responseData = await error.response.data;
    }
    if (responseData.status) {
      window.localStorage.setItem("auth-token", responseData.token);
      window.localStorage.setItem("username", responseData.username);
      window.localStorage.setItem("dark-mode", false);
    }
    dispatch({
      type: "SIGNUP",
      payload: {
        login: { status: responseData.status, message: responseData.message },
        switch: {
          status: uuid(),
        },
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const Login = (loginData) => async (dispatch) => {
  try {
    let responseData;
    try {
      const { data } = await api.SignIn(loginData);
      responseData = data;
    } catch (error) {
      responseData = error.response.data;
    }
    if (responseData.status) {
      window.localStorage.setItem("auth-token", responseData.token);
      window.localStorage.setItem("username", responseData.username);
      window.localStorage.setItem("dark-mode", false);
    }
    dispatch({
      type: "LOGIN",
      payload: {
        login: { status: responseData.status, message: responseData.message },
        switch: {
          status: uuid(),
        },
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const Logout = () => async (dispatch) => {
  window.localStorage.removeItem("auth-token");
  window.localStorage.removeItem("username");
  window.localStorage.removeItem("posts-count");
  window.localStorage.removeItem("dark-mode");

  try {
    dispatch({
      type: "LOGOUT",
      payload: { status: uuid() },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const GetUser = () => async (dispatch) => {
  try {
    const { data } = await api.GetUser();
    dispatch({
      type: "GET_USER",
      payload: {
        email: data.email,
        name: data.name,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};
