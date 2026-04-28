import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_FAIL,
  FETCH_PRODUCT_CATEGORIES_SUCCESS,
  FETCH_PRODUCT_LIST_BY_CATEGORY_SUCCESS,
  FETCH_SEARCHED_PRODUCT_LIST_SUCCESS
} from "../actions/productActions";

// 🔹 Types
interface ProductState {
  products: any[];
  product: any | null;
  error: string | null;
  categories?: string[];
  totalProducts?: number;
}

const initialState: ProductState = {
  products: [],
  product: null,
  error: null,
  categories: [],
  totalProducts: 0,
};

export const productReducer = (
  state = initialState,
  action: any
): ProductState => {
  switch (action.type) {
    // 🔹 List

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        totalProducts: action.payload.total,
      };

    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // 🔹 Detail

    case FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        product: action.payload,
      };

    case FETCH_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case FETCH_PRODUCT_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload, 
      };
    case FETCH_PRODUCT_LIST_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        products: action.payload.products, 
        totalProducts: action.payload.total,
      };
    case FETCH_SEARCHED_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        totalProducts: action.payload.total,
      };

    default:
      return state;
  }
};