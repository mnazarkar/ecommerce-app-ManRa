import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCartQuantity } from "../actions/cartActions";

type CartItem = {
  quantity: number;
  total: number;
  discountedTotal: number;
};

// Sum of discountedTotal
export const getDiscountedTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.discountedTotal, 0);
};

// Sum of total
export const getTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.total, 0);
};

// Sum of quantity
export const getTotalQuantity = (items: CartItem[]): number => {
  const quantitySum = items.reduce((sum, item) => sum + item.quantity, 0);

  return quantitySum;
};

const Cart = () => {
  const cart = useSelector((state: any) => state.cart);
  const [cartProduct, setCartProduct] = useState(cart.carts[0]?.products || []);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    setTimeout(() => {
      setCartProduct(cart.carts[0]?.products || []);
    }, 2000);
  }, [cart.carts]);


  // Update quantity
  const handleQuantityChange = (id: number, qty: number) => {
    const updated = cartProduct.map((p: { id: number; price: number; }) =>
      p.id === id
        ? {
          ...p,
          quantity: qty,
          total: p.price * qty,
          discountedTotal: (p.price * qty * 0.9), // demo calc
        }
        : p
    );
    dispatch(updateCartQuantity(getTotalQuantity(updated)));

    setCartProduct(updated);
  };

  // Remove item
  const handleRemove = (id: number) => {
    const updated = cartProduct.filter((p: { id: number }) => p.id !== id);
    setCartProduct(updated);
    dispatch(updateCartQuantity(getTotalQuantity(updated)));
  };

  const cartView = () => {
    return (
      <div className="p-6 grid md:grid-cols-3 gap-6">

        {/* 🛍️ Product List */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {cartProduct.map((product: { id: number; thumbnail: string; title: string; price: number; quantity: number; total: number; discountedTotal: number }) => (
            <div
              key={product.id}
              className="flex gap-4 border rounded-lg p-4 shadow-sm"
            >
              {/* Image */}
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-24 h-24 object-cover rounded"
              />

              {/* Details */}
              <div className="flex-1">
                <h3 className="font-semibold">{product.title}</h3>

                <p className="text-gray-500 text-sm">
                  ₹{product.price}
                </p>

                {/* Quantity */}
                <div className="mt-2 cursor-pointer">
                  <select
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        product.id,
                        Number(e.target.value)
                      )
                    }
                    className="border rounded px-2 py-1 cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5].map((q) => (
                      <option key={q} value={q} className="cursor-pointer hover:bg-gray-200">
                        {q}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Total */}
                <p className="mt-2 font-medium">
                  Total: ₹{product.discountedTotal.toFixed(2)}
                </p>
              </div>

              {/* Delete */}
              <button
                onClick={() => handleRemove(product.id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>

        {/* 🧾 Order Summary */}
        <div className="border rounded-lg p-4 h-fit shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span>Total</span>
            <span>₹{getTotal(cartProduct).toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2 text-green-600">
            <span>Discounted Total</span>
            <span>₹{getDiscountedTotal(cartProduct).toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Total Items</span>
            <span>{getTotalQuantity(cartProduct)}</span>
          </div>

          <button className="w-full bg-linear-to-bl from-violet-500 to-fuchsia-500 text-white py-2 rounded hover:bg-gray-800 transition cursor-pointer">
            Proceed to Checkout
          </button>
        </div>
      </div>
    );
  };
  const skeletonView = () => {
    return (
      <div className="p-6 space-y-4 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-24 h-24 bg-gray-300 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 w-3/4 rounded" />
              <div className="h-4 bg-gray-300 w-1/2 rounded" />
            </div>
          </div>
        ))}
        <div className="rounded-lg p-4 h-fit shadow-md animate-pulse">
          <div className="h-5 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="flex justify-between mb-2">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="h-4 bg-gray-300 rounded w-32"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="flex justify-between mb-4">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-4 bg-gray-300 rounded w-10"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    );
  };

  const getView = () => {
    if (cartProduct.length === 0) {
      return skeletonView();
    }
    return cartView();
  };

  return (
    getView()
  );
};

export default Cart;