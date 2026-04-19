import type { Dispatch } from "redux";
import api from "../api/axios";
import { SHOW_LOADER, HIDE_LOADER } from "../types";

// 🔹 Action Types
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAIL = "FETCH_PRODUCTS_FAIL";

export const FETCH_PRODUCT_DETAIL_SUCCESS = "FETCH_PRODUCT_DETAIL_SUCCESS";
export const FETCH_PRODUCT_DETAIL_FAIL = "FETCH_PRODUCT_DETAIL_FAIL";

export const FETCH_PRODUCT_CATEGORIES_SUCCESS = "FETCH_PRODUCT_CATEGORIES_SUCCESS";
export const FETCH_PRODUCT_LIST_BY_CATEGORY_SUCCESS = "FETCH_PRODUCT_LIST_BY_CATEGORY_SUCCESS";
export const FETCH_SEARCHED_PRODUCT_LIST_SUCCESS = "FETCH_SEARCHED_PRODUCT_LIST_SUCCESS";

// 🔹 Fetch All Products
export const fetchProducts = (limit= 20, skip= 0) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SHOW_LOADER });

    const res = await api.get(`/products/?limit=${limit}&skip=${skip}`);

    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: res.data,
    });
    dispatch({ type: HIDE_LOADER });
  } catch (error: any) {
    dispatch({
      type: FETCH_PRODUCTS_FAIL,
      payload: error.message || "Something went wrong",
    });
    dispatch({ type: HIDE_LOADER });
  }
};

// 🔹 Fetch Single Product
export const fetchProductDetail = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SHOW_LOADER });

    const res = await api.get(`/products/${id}`);

    dispatch({
      type: FETCH_PRODUCT_DETAIL_SUCCESS,
      payload: res.data,
    });
    dispatch({ type: HIDE_LOADER });
  } catch (error: any) {
    dispatch({
      type: FETCH_PRODUCT_DETAIL_FAIL,
      payload: error.message || "Something went wrong",
    });
    dispatch({ type: HIDE_LOADER });
  }
};

export const fetchProductCategories = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SHOW_LOADER });
    const res = await api.get("/products/category-list");
    dispatch({
      type: FETCH_PRODUCT_CATEGORIES_SUCCESS,
      payload: res.data,
    });
    dispatch({ type: HIDE_LOADER });
  } catch (error: any) {
    dispatch({ type: HIDE_LOADER });
    console.error("Error fetching product categories:", error.message);
    throw error;
  }
};

export const fetchProductListByCategory = (categoryName: string, limit = 20, skip = 0) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SHOW_LOADER });
    const res = await api.get(`products/category/${categoryName}?limit=${limit}&skip=${skip}`);
    dispatch({
      type: FETCH_PRODUCT_LIST_BY_CATEGORY_SUCCESS,
      payload: res.data,
    });
    dispatch({ type: HIDE_LOADER });
  } catch (error: any) {
    dispatch({ type: HIDE_LOADER });
    console.error("Error fetching product list by category:", error.message);
    throw error;
  }
};

export const fetchSearchedProductList = (searchTerm: string, limit = 20, skip = 0) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SHOW_LOADER });
    const res = await api.get(`products/search?q=${searchTerm}&limit=${limit}&skip=${skip}`);
    dispatch({
      type: FETCH_SEARCHED_PRODUCT_LIST_SUCCESS,
      payload: res.data,
    });
    dispatch({ type: HIDE_LOADER });
  } catch (error: any) {
    dispatch({ type: HIDE_LOADER });
    console.error("Error fetching searched product list:", error.message);
    throw error;
  }
};
