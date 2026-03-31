export interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  qty: number;
}

export interface CartStore {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}
