import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { loaderReducer } from "./reducers/loaderReducer";
import { productReducer } from "./reducers/productReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  loader: loaderReducer,
  product: productReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));