import { create } from "zustand";
import { CartStore } from "@/types/cart";

export const useCartStore = create<CartStore>((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      let existItem = state.cart.find((item) => item.id === product.id);
      if (existItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
          ),
        };
      }
      return {
        cart: [...state.cart, { ...product, qty: 1 }],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== Number(id)),
    })),

  clearCart: () => set({ cart: [] }),
}));
