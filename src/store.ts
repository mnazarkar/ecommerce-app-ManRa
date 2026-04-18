import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { loaderReducer } from "./reducers/loaderReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  loader: loaderReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));