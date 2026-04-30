import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { Star } from "lucide-react";
import Recommendations from "../Components/Recommendations";
import { GradientHeartFilled, GradientHeartOutline } from "./GradientHeart";
import { toggleWishlist } from "../store/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { HIDE_LOADER, SHOW_LOADER } from "../types";

interface Review {
  rating: number;
  comment: string;
  reviewerName: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  images: string[];
  reviews: Review[];
  thumbnail: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [animate, setAnimate] = useState(false);
  const dispatch = useDispatch();
  const wishlist = useSelector((state: any) => state.wishlist);
  const cartSlice = useSelector((state: any) => state.cartSlice);
  const navigate = useNavigate();

  const isWishlisted = (id: number) =>
    wishlist.some((item: any) => item.id === id);

    const handleWishlistClick = (product: Product) => {
      setAnimate(true);
      dispatch(toggleWishlist(product));
  
      setTimeout(() => setAnimate(false), 200);
  };

  const isInCart = cartSlice.some((item: any) => item.id === Number(id));

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch({type: SHOW_LOADER});
      const res = await api.get(`/products/${id}`);
      setTimeout(() => {setProduct(res.data);
        dispatch({type: HIDE_LOADER});
        scrollToTop();
      }, 800);
      
    };
    fetchProduct();
  }, [id]);

  const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  const handleAddToCart = async (p:Product, qty:number) =>{
    if (isInCart) {
      navigate("/cart");
      return;
    }
    dispatch({type: SHOW_LOADER});
    dispatch(addToCart({product: p,stock:p.stock, quantity: qty}));
    setTimeout(()=>{
      dispatch({type: HIDE_LOADER});
    },1000)
  };

  if (!product) {
    return (
      <div className="animate-pulse grid md:grid-cols-2 gap-6">
        <div className="h-96 bg-gray-300 rounded-xl" />
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 w-1/2 rounded" />
          <div className="h-4 bg-gray-300 w-3/4 rounded" />
        </div>
      </div>
    );
  }

  const finalPrice =
    product.price -
    (product.price * product.discountPercentage) / 100;

  return (
    <div className="space-y-10">

      {/* TOP SECTION */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* IMAGE GALLERY */}
        <div>
          <div className="overflow-hidden rounded-2xl shadow-md shadow-fuchsia-500/50">
            <img
              src={product.images[activeImage]}
              className="w-full h-[400px] object-cover transition duration-500 hover:scale-105"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 p-1 mt-3 overflow-x-auto">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-16 object-cover rounded cursor-pointer transition
                ${
                  activeImage === i
                    ? "ring-2 ring-violet-500"
                    : "opacity-70 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <span className={`cursor-pointer transition-all duration-300
                  ${(animate && isWishlisted(product.id)) ? "scale-115" : "scale-100"}`}
              onClick={(e) => {
                e.stopPropagation();
                handleWishlistClick(product);
              }}
            >{isWishlisted(product.id) ? (
              <GradientHeartFilled />
            ) : (
              <GradientHeartOutline />
            )}</span>
          </div>

          <p className="text-gray-500">{product.brand}</p>

          {/* PRICE */}
          <div className="flex items-center gap-3">
            <span className="text-gray-400 line-through">
              ₹{product.price}
            </span>

            <span className="text-green-600 text-sm font-semibold">
              {product.discountPercentage}% OFF
            </span>

            <span className="text-2xl font-bold">
              ₹{finalPrice.toFixed(2)}
            </span>
          </div>

          {/* RATING */}
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="fill-yellow-400" size={18} />
            {product.rating}
          </div>

          {/* STOCK */}
          <p>
            Stock:{" "}
            <span
              className={
                (product.stock ?? 0) > 10
                  ? "text-green-600"
                  : "text-red-500 animate-pulse"
              }
            >
              {(product.stock ?? 0) > 10
                ? "In Stock"
                : "Low Stock"}
            </span>
          </p>

          {/* QUANTITY */}
          <div>
            <label className="text-sm">Quantity</label>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="ml-2 border px-2 py-1 bg-gray-100 rounded-full shadow-sm cursor-pointer"
            >
              {Array.from({ length: Number(product.stock) }).map((_,i) => (
                <option key={i}>{i+1}</option>
              ))}
            </select>
          </div>

          {/* CTA */}
          <button className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-bl from-violet-500 to-fuchsia-500 shadow-md hover:scale-[1.02] transition cursor-pointer"
            onClick={()=>handleAddToCart(product,qty)}
          >
            {isInCart ? 'Go To Cart' : 'Add to Cart'}
          </button>

          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>

      {/* BUY TOGETHER */}
      <Recommendations
        title="Frequently Bought Together"
        category={product.category}
        limit={5}
        random={Math.floor(Math.random() * 80)}
      />

      {/* SIMILAR PRODUCTS */}
      <Recommendations
        title="Similar Products"
        category={product.category}
        limit={8}
        random={Math.floor(Math.random() * 80)}
      />

      {/* RANDOM RECOMMENDATIONS */}
      <Recommendations title="You May Also Like" random={Math.floor(Math.random() * 80)} />

      {/* REVIEWS */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>

        <div className="space-y-4">
          {product.reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white shadow-sm rounded-xl p-4"
            >
              <p className="font-semibold">{r.reviewerName}</p>
              <p className="text-yellow-500">⭐ {r.rating}</p>
              <p className="text-gray-600 text-sm">
                {r.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;