"use client"

import { useCartStore } from "@/store/useCartStore"
import { CartItem } from "@/types/cart"

function CheckoutItems() {
  const cart: CartItem[] = useCartStore((state) => state.cart)

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
      
      <h3 className="text-lg font-semibold text-orange-600 mb-4">
        Your Order
      </h3>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-sm">Cart is empty</p>
      ) : (
        <>
          <div className="space-y-4 mb-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-3"
              >
                {/* LEFT: image + info */}
                <div className="flex items-center gap-3">
                  
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-30 h-30 object-cover"
                  />

                  {/* Info */}
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.qty}
                    </p>
                  </div>
                </div>

                {/* RIGHT: price */}
                <p className="text-sm font-semibold text-orange-500">
                  ${item.price * item.qty}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between font-semibold text-gray-800 pt-2 border-t">
            <span>Total</span>
            <span className="text-orange-600">${total}</span>
          </div>
        </>
      )}
    </div>
  )
}

export default CheckoutItems