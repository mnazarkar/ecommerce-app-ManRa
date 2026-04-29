import { createSlice } from "@reduxjs/toolkit";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

const getInitialState = () => {
  const userId = localStorage.getItem("userId") || "guest";
  const data = localStorage.getItem(`wishlist_${userId}`);
  return data ? JSON.parse(data) : [];
};

const initialState: Product[] = getInitialState();

const saveToStorage = (state: any[]) => {
  const userId = localStorage.getItem("userId") || "guest";
  localStorage.setItem(`wishlist_${userId}`, JSON.stringify(state));
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const exists = state.find((item) => item?.id === action.payload.id);

      let updated;
      if (exists) {
        updated = state.filter((item) => item.id !== action.payload.id);
      } else {
        updated = [...state, action.payload];
      }

      saveToStorage(updated);
      return updated;
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;