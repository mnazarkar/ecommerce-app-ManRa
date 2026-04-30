import type { Dispatch } from "redux";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_USER_SUCCESS,
  SHOW_LOADER,
  HIDE_LOADER
} from "../types";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


export const login =
  (username: string, password: string, navigate: ReturnType<typeof useNavigate>) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: SHOW_LOADER });

    try {
      const data = await loginApi(username, password);

      // store token + expiry
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem(
        "tokenExpiry",
        String(Date.now() + 30 * 60 * 1000)
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      navigate("/");
      dispatch({ type: HIDE_LOADER });
    } catch (err: any) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.message,
      });
      dispatch({ type: HIDE_LOADER });
    }
  };

export const logout = () => (dispatch: Dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
};

export const getUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SHOW_LOADER });
    const res = await api.get("/auth/me");

    localStorage.setItem("userId", res.data.id);

    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data,
    });
    dispatch({ type: HIDE_LOADER });
  } catch (err) {
    // ❌ token invalid → logout
    localStorage.clear();

    dispatch({
      type: LOGOUT,
    });
    dispatch({ type: HIDE_LOADER });
  }
};

export interface LoginResponse {
 id: number,
 username: string,
 email: string,
 firstName: string,
 lastName: string,
 gender: string,
 image: string,
 accessToken: string,
 refreshToken: string
}

export const loginApi = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", {
    username,
    password,
    expiresInMins: 30,
  });

  return res.data;
};