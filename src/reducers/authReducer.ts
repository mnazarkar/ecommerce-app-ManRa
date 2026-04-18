import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_USER_SUCCESS
} from "../types";

export interface AuthState {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("accessToken"),
  isAuthenticated: false,
  error: null,
};

export const authReducer = (
  state = initialState,
  action: any
): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        token: action.payload.accessToken,
        isAuthenticated: true,
        error: null,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};