import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";

type Product = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
};

type CartItem = Product & {
    quantity: number;
    total: number;
    discountedTotal: number;
    stock: number;
};

type AddToCartPayload = {
    product: Product;
    stock: number;
    quantity: number;
};

const getInitialState = (): CartItem[] => {
    const userId = localStorage.getItem("userId") || "guest";
    const data = localStorage.getItem(`cart_${userId}`);
    return data ? JSON.parse(data) : [];
};

const saveToStorage = (state: CartItem[]) => {
    const userId = localStorage.getItem("userId") || "guest";
    localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
};

const initialState: CartItem[] = getInitialState();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // ADD TO CART
        addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
            const { product, stock, quantity } = action.payload;

            const existing = state.find((item) => item.id === product.id);

            let updated;

            if (existing) {
                // total quantity after adding
                const newQty = existing.quantity + quantity;

                // clamp with stock
                const safeQty = Math.min(newQty, existing.stock);

                updated = state.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: safeQty,
                            total: safeQty * item.price,
                            discountedTotal: safeQty * item.price * 0.9,
                        }
                        : item
                );
            } else {
                const safeQty = Math.min(quantity, stock);

                updated = [
                    ...state,
                    {
                        ...product,
                        quantity: safeQty,
                        total: safeQty * product.price,
                        discountedTotal: safeQty * product.price * 0.9,
                        stock,
                    },
                ];
            }

            saveToStorage(updated);
            return updated;
        },

        // REMOVE ITEM
        removeFromCart: (state, action: PayloadAction<number>) => {
            const updated = state.filter((item) => item.id !== action.payload);

            saveToStorage(updated);
            return updated;
        },

        // UPDATE QUANTITY
        updateQuantity: (
            state,
            action: PayloadAction<{ id: number; quantity: number }>
        ) => {
            const { id, quantity } = action.payload;

            const updated = state.map((item) => {
                if (item.id !== id) return item;

                const safeQty = Math.min(Math.max(1, quantity), item.stock);

                return {
                    ...item,
                    quantity: safeQty,
                    total: safeQty * item.price,
                    discountedTotal: safeQty * item.price * 0.9,
                };
            });

            saveToStorage(updated);
            return updated;
        },

        // CLEAR CART
        clearCart: () => {
            saveToStorage([]);
            return [];
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;