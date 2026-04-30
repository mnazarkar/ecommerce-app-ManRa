import { Trash2, CircleCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { removeFromCart, updateQuantity, addToCart } from "../store/cartSlice";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountedTotal: number;
  thumbnail: string;
  stock: number;
};

export const getDiscountedTotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.discountedTotal, 0);

export const getTotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.total, 0);

export const getTotalQuantity = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.quantity, 0);

const Cart = () => {
  const cart = useSelector((state: any) => state.cartSlice);
  const [cartProduct, setCartProduct] = useState<CartItem[]>(
    cart || []
  );
  const [deletedItem, setDeletedItem] = useState<CartItem | null>(null);
  const [showToast, setShowToast] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [stockMap, setStockMap] = useState<Record<number, number>>({});

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setCartProduct(cart || []);
    }, 800);
  }, [cart.carts]);

  useEffect(() => {
    const fetchStock = async () => {
      if (!cartProduct.length) return;

      try {
        const requests = cartProduct.map((p) =>
          api.get(`/products/${p.id}?select=stock`)
        );

        const responses = await Promise.all(requests);

        const stockData: Record<number, number> = {};

        responses.forEach((res, index) => {
          const productId = cartProduct[index].id;
          stockData[productId] = res.data.stock;
        });

        setStockMap(stockData);
      } catch (err) {
        console.error("Stock fetch error", err);
      }
    };

    fetchStock();
  }, [cartProduct.length]);

  // UPDATE QTY
  const handleQuantityChange = (id: number, qty: number) => {
    const updated = cartProduct.map((p) =>
      p.id === id
        ? {
          ...p,
          quantity: qty,
          total: p.price * qty,
          discountedTotal: p.price * qty * 0.9,
        }
        : p
    );

    dispatch(updateQuantity({id:id,quantity:getTotalQuantity(updated)}));
    setCartProduct(updated);
  };

  // REMOVE
  const handleRemove = (id: number) => {
    const itemToDelete = cartProduct.find((p) => p.id === id);
    if (!itemToDelete) return;

    const updated = cartProduct.filter((p) => p.id !== id);

    setCartProduct(updated);
    dispatch(removeFromCart(id));

    setDeletedItem(itemToDelete);
    setShowToast(true);

    // Clear previous timeout if any
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setShowToast(false);
      setDeletedItem(null);
    }, 8000);
  };

  const handleUndo = () => {
    if (!deletedItem) return;

    const updated = [deletedItem, ...cartProduct];

    setCartProduct(updated);
    dispatch(addToCart({product:deletedItem,stock:deletedItem.stock,quantity:getTotalQuantity(updated)}));

    setDeletedItem(null);
    setShowToast(false);

    // Clear timeout on undo
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const cartView = () => {
    return (
      <div className="grid lg:grid-cols-3 gap-6">

        {/* PRODUCTS */}
        <div className="lg:col-span-2 flex flex-col gap-3">

          {cartProduct.map((product) => {
            const discount =
              product.total - product.discountedTotal;

            const stock = stockMap[product.id] ?? 5; // fallback
            const isMax = product.quantity === stock;
            const isMin = product.quantity === 1;

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex gap-3"
              >
                {/* IMAGE */}
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.thumbnail}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between">

                  {/* TITLE + DELETE */}
                  <div className="flex justify-between gap-2">
                    <h3 className="font-medium text-sm line-clamp-2 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                      {product.title}
                    </h3>

                    <button
                      onClick={() => handleRemove(product.id)}
                      className="text-gray-400 hover:text-red-500 transition cursor-pointer active:scale-90"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* PRICE */}
                  <div className="flex items-center gap-2 flex-wrap mt-1">
                    <span className="text-gray-400 line-through text-xs">
                      ₹{product.total.toFixed(2)}
                    </span>

                    <span className="text-green-600 text-xs font-semibold">
                      SAVE ₹{discount.toFixed(2)}
                    </span>

                    <span className="font-semibold text-sm">
                      ₹{product.discountedTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* STEPPER */}
                  <div className="flex items-center justify-between mt-2">

                    <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1">

                      {/* MINUS */}
                      <button
                        disabled={isMin}
                        onClick={() =>
                          handleQuantityChange(product.id, product.quantity - 1)
                        }
                        className={`w-6 h-6 flex items-center justify-center rounded${isMin ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-200 cursor-pointer active:scale-90"}`}
                      >
                        -
                      </button>

                      {/* VALUE */}
                      <span className="mx-2 min-w-[20px] text-center text-sm font-medium">
                        {product.quantity}
                      </span>

                      {/* PLUS */}
                      <button
                        disabled={isMax}
                        onClick={() =>
                          handleQuantityChange(product.id, product.quantity + 1)
                        }
                        className={`w-6 h-6 flex items-center justify-center rounded ${isMax ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-200 cursor-pointer active:scale-90"}`}
                      >
                        +
                      </button>
                    </div>

                    {/* STOCK */}
                    <span className="text-xs text-gray-400">
                      Stock: {stock}
                    </span>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded-xl shadow-md p-5 h-fit sticky top-20">

          <h2 className="text-lg font-semibold mb-4">
            Order Summary
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total MRP</span>
              <span>₹{getTotal(cartProduct).toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>
                -₹
                {(
                  getTotal(cartProduct) -
                  getDiscountedTotal(cartProduct)
                ).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Items</span>
              <span>{getTotalQuantity(cartProduct)}</span>
            </div>
          </div>

          <div className="border-t my-4" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>
              ₹{getDiscountedTotal(cartProduct).toFixed(2)}
            </span>
          </div>

          <button className="mt-5 w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-bl from-violet-500 to-fuchsia-500 shadow-md hover:scale-[1.02] transition cursor-pointer">
            Proceed to Checkout
          </button>
        </div>
        {showToast && (
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">

            <div className="flex items-center justify-between bg-black text-white px-4 py-3 rounded-lg shadow-lg animate-slideUp">
              <span className="text-sm flex gap-2">
                <CircleCheck size={24} className="text-fuchsia-400" />
                <span>Item removed from Cart</span>
              </span>

              <button
                onClick={handleUndo}
                className="text-sm font-semibold text-fuchsia-400 hover:text-white transition cursor-pointer underline underline-offset-4">
                Undo
              </button>
            </div>

          </div>
        )}
      </div>
    );
  };

  const skeletonView = () => {
    return (
      <div className="p-6 space-y-3 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-20 h-20 bg-gray-300 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-300 w-3/4 rounded" />
              <div className="h-3 bg-gray-300 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return cartProduct.length === 0 ? skeletonView() : cartView();
};

export default Cart;