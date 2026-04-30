import { ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { HIDE_LOADER, SHOW_LOADER } from "../types";
import Toast from "../Components/Toast";
import { useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

const Wishlist = () => {
  const wishlist = useSelector((state: any) => state.wishlist);
  const [showToast, setShowToast] = useState(false);
  const [toastLabel, setToastLabel] = useState('');
  const [showToastDownAnimation, setShowToastDownAnimation] = useState(false);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleRemove = (product: Product) => {
    dispatch({ type: SHOW_LOADER });
    dispatch(toggleWishlist(product));
    setTimeout(() => {
      dispatch({ type: HIDE_LOADER });
      setShowToast(true);
      setToastLabel('Item Removed from Wishlist');
      setTimeout(() => {
        setShowToastDownAnimation(true);
      }, 7800);
      setTimeout(() => {
        setShowToast(false);
        setShowToastDownAnimation(false);
      }, 8000);
    }, 800);
  };

  const handleMoveToCart = (product: Product) => {
    dispatch({ type: SHOW_LOADER });
    dispatch(addToCart({ product: product, stock: 5, quantity: 1 }));
    dispatch(toggleWishlist(product));
    setTimeout(() => {
      dispatch({ type: HIDE_LOADER });
      setShowToast(true);
      setToastLabel('Item Moved To Cart');
      setTimeout(() => {
        setShowToastDownAnimation(true);
      }, 7800);
      setTimeout(() => {
        setShowToast(false);
        setShowToastDownAnimation(false);
      }, 8000);
    }, 1000);
  };

  if (!wishlist.length) {
    return (
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Wishlist</h1>

        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <p className="text-gray-500">
            No items in wishlist
          </p>
        </div>
        {showToast && <Toast label={toastLabel} showToastDownAnimation={showToastDownAnimation} handleUndo={() => { }} />}
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Wishlist ({wishlist.length})
      </h1>

      <div className="flex flex-col gap-3">

        {wishlist.map((product: Product) => {
          const discountedPrice = product.price * 0.9;
          const discount = product.price - discountedPrice;

          return (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-3 flex gap-3 cursor-pointer"
            >
              {/* IMAGE */}
              <div className="w-25 h-25 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={product.thumbnail}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1 flex flex-col justify-between">

                {/* TITLE + ACTIONS */}
                <div className="flex justify-between gap-2">

                  <h3 className="font-medium text-md font-bold line-clamp-2">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-2">

                    {/* REMOVE */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(product);
                      }}
                      className="text-red-500 hover:scale-110 active:scale-90 transition cursor-pointer"
                    >
                      <Trash2
                        size={24}
                        className="text-red-500"
                      />
                    </button>

                  </div>
                </div>

                {/* PRICE */}
                <div className="flex items-end justify-between gap-4 flex-wrap mt-1">

                  <div className="flex flex-col justify-center items-start gap-2">
                    <div className="flex justify-center items center gap-4">
                      <span className="text-gray-400 line-through text-sm">
                        ₹{product.price.toFixed(2)}
                      </span>

                      <span className="text-green-600 text-sm font-semibold">
                        SAVE ₹{discount.toFixed(2)}
                      </span>
                    </div>

                    <span className="font-bold text-lg">
                      ₹{discountedPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* MOVE TO CART */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveToCart(product);
                    }}
                    className="text-gray-600 hover:text-black hover:scale-110 active:scale-90 transition cursor-pointer"
                  >
                    <ShoppingCart size={24} className="text-fuchsia-500" />
                  </button>

                </div>

              </div>
            </div>
          );
        })}

      </div>
      {showToast && <Toast label={toastLabel} showToastDownAnimation={showToastDownAnimation} handleUndo={() => { }} />}
    </div>
  );
};

export default Wishlist;