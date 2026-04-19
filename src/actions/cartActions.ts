import type { Dispatch } from "redux";
import api from "../api/axios";
import { HIDE_LOADER, SHOW_LOADER } from "../types";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const GET_CART = "GET_CART";
export const UPDATE_CART_QUANTITY = "UPDATE_CART_QUANTITY";

export const fetchUserCart = (userId: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SHOW_LOADER });

    const res = await api.get(`/carts/user/${userId}`);

    dispatch({
      type: GET_CART,
      payload: res.data.carts,
    });
    dispatch({ type: HIDE_LOADER });
  } catch (error: any) {
    dispatch({ type: HIDE_LOADER });
  }
};

export const updateCartQuantity = (quantity: number) => (dispatch: Dispatch) => {
  dispatch({
    type: UPDATE_CART_QUANTITY,
    payload: quantity,
  });
};
