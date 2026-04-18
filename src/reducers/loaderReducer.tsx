// loaderReducer.ts
import { SHOW_LOADER, HIDE_LOADER } from "../types";

export interface LoaderState {
  isLoading: boolean;
}

const initialState: LoaderState = {
  isLoading: false,
};

export const loaderReducer = (
  state = initialState,
  action: any
): LoaderState => {
  switch (action.type) {
    case SHOW_LOADER:
      return { isLoading: true };

    case HIDE_LOADER:
      return { isLoading: false };

    default:
      return state;
  }
};