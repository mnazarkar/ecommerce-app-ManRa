import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../store/wishlistSlice";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

const Wishlist = () => {
  const wishlist = useSelector((state: any) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (product: Product) => {
    dispatch(toggleWishlist(product));
  };

  if (!wishlist.length) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Wishlist</h1>

        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <p className="text-gray-500">
            No items in wishlist
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Wishlist
      </h1>

      <div className="flex flex-col gap-3">

        {wishlist.map((product: Product) => {
          // fake discount (same logic as cart)
          const discountedPrice = product.price * 0.9;
          const discount = product.price - discountedPrice;

          return (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex gap-3 cursor-pointer"
            >
              {/* IMAGE */}
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={product.thumbnail}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1 flex flex-col justify-between">

                {/* TITLE + REMOVE */}
                <div className="flex justify-between gap-2">
                  <h3 className="font-medium text-sm line-clamp-2">
                    {product.title}
                  </h3>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(product);
                    }}
                    className="text-gray-400 hover:text-red-500 transition cursor-pointer active:scale-90"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* PRICE */}
                <div className="flex items-center gap-2 flex-wrap mt-1">
                  <span className="text-gray-400 line-through text-xs">
                    ₹{product.price.toFixed(2)}
                  </span>

                  <span className="text-green-600 text-xs font-semibold">
                    SAVE ₹{discount.toFixed(2)}
                  </span>

                  <span className="font-semibold text-sm">
                    ₹{discountedPrice.toFixed(2)}
                  </span>
                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default Wishlist;