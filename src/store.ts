import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { loaderReducer } from "./reducers/loaderReducer";
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import wishlistReducer from "./store/wishlistSlice"
import cartSliceReducer from "./store/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  loader: loaderReducer,
  product: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  cartSlice: cartSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));