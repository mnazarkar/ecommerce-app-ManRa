import {
  GET_CART,
  UPDATE_CART_QUANTITY
} from "../actions/cartActions";

// 🔹 Types
interface CartState {
  carts: any[];
  userId: number;
  cartItems?: any[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
}

const initialState: CartState = {
  carts: [],
  userId: 0,
  cartItems: [],
  total: 0,
  discountedTotal: 0,
  totalProducts: 0,
  totalQuantity: 0,
};

export const cartReducer = (
  state = initialState,
  action: any
): CartState => {
  switch (action.type) {

    case GET_CART:
      return {
        ...state,
        carts: action.payload,
        userId: action.payload[0]?.userId || 0,
        cartItems: action.payload[0]?.products || [],
        total: action.payload[0]?.total || 0,
        discountedTotal: action.payload[0]?.discountedTotal || 0,
        totalProducts: action.payload[0]?.totalProducts || 0,
        totalQuantity: action.payload[0]?.totalQuantity || 0,
      };
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        totalQuantity: action.payload,
      };

    default:
      return state;
  }
};
