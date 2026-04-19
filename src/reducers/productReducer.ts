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
  loading: boolean;
  error: string | null;
  categories?: string[];
}

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  categories: [],
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
        loading: false,
        products: action.payload,
      };

    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // 🔹 Detail

    case FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };

    case FETCH_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_PRODUCT_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload, 
      };
    case FETCH_PRODUCT_LIST_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload, 
      };
    case FETCH_SEARCHED_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload, 
      };

    default:
      return state;
  }
};