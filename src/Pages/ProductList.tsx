import { useEffect, useRef, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductListByCategory,
  fetchSearchedProductList,
} from "../actions/productActions";
import { Star } from "lucide-react";
import { GradientHeartFilled, GradientHeartOutline } from "./GradientHeart";
import { toggleWishlist } from "../store/wishlistSlice";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

const LIMIT = 20;

const ProductList = () => {
  const { products, totalProducts } = useSelector(
    (state: any) => state.product
  );
  const wishlist = useSelector((state: any) => state.wishlist);

  const isWishlisted = (id: number) =>
  wishlist.some((item: any) => item.id === id);

  const [productList, setProductList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [animatingId, setAnimatingId] = useState<number | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const hasMore = productList.length < totalProducts;

  // Append products instead of replace
  useEffect(() => {
    if (!products) return;

    const timer = setTimeout(() => {
      setProductList((prev) => {
      const newList =
        page === 1 ? products : [...prev, ...products];
      return newList;
    });
    setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [products]);

  // Reset when filters change
  useEffect(() => {
    setPage(1);
    setProductList([]);
  }, [category, query, sortBy, order]);

  // API Call
  useEffect(() => {
    const skip = (page - 1) * LIMIT;

    setLoading(true);

    if (query) {
      dispatch(
        fetchSearchedProductList(query, LIMIT, skip, sortBy, order)
      );
    } else if (category) {
      dispatch(
        fetchProductListByCategory(category, LIMIT, skip, sortBy, order)
      );
    } else {
      dispatch(fetchProducts(LIMIT, skip, sortBy, order));
    }
  }, [page, category, query, sortBy, order]);

  // Intersection Observer
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  const handleWishlistClick = (product: Product) => {
  setAnimatingId(product.id);
  dispatch(toggleWishlist(product));

  setTimeout(() => setAnimatingId(null), 200);
};

  // UI
  const PLPView = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h2 className="text-lg font-semibold">
          {query
            ? `Searched Results: ${query}`
            : category
            ? `Category: ${category}`
            : "All Products"}
        </h2>

        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="title">Title</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      {!loading && productList.length === 0 && (
        <p className="text-center py-10">No products found</p>
      )}

      <div className="lg:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {productList.map((p: any) => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="bg-white rounded-xl shadow-md p-3 cursor-pointer hover:shadow-xl transition"
          >
            <div className="relative">
              <img
                src={p.thumbnail}
                alt={p.title}
                className="h-50 w-full object-cover rounded"
                loading="lazy"
              />
              <span className="absolute bottom-2 left-2 px-1 text-sm rounded bg-black/10">
                <span className="flex flex-row items-center justify-center gap-1 bg-gradient-to-bl from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-black">|</span>
                  {p.rating}
                </span>
              </span>
              <span
                className={`absolute top-2 right-2 p-1 rounded-full bg-black/10 cursor-pointer
                  transition-all duration-300
                  ${(animatingId === p.id && isWishlisted(p.id)) ? "scale-115" : "scale-100"}
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  handleWishlistClick(p);
                }}
              >
                {isWishlisted(p.id) ? (
                  <GradientHeartFilled />
                ) : (
                  <GradientHeartOutline />
                )}
              </span>
            </div>
            <h3 className="mt-2 font-semibold line-clamp-2">
              {p.title}
            </h3>
            <p className="text-gray-500 text-sm capitalize">
              {p.category}
            </p>
            <div className="flex justify-between mt-2">
              <span className="font-bold">₹{p.price}</span>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2 animate-pulse">
              <div className="h-40 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      <div ref={observerRef} className="h-10" />

      {!hasMore && productList.length > 0 && (
        <p className="text-center my-4 text-gray-500">
          No more products
        </p>
      )}
    </div>
  );
};
const skeletonView = () => {
  return (
    <div className="lg:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="space-y-2 animate-pulse">
              <div className="h-40 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
            </div>
          ))}
        </div>
  );
};

const getView = () => {
  if (productList.length === 0) {
    return skeletonView();
  }
  return PLPView();
};

return (
  getView()
);
};

export default ProductList;