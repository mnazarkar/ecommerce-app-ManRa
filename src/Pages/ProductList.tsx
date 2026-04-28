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

const LIMIT = 20;

const ProductList = () => {
  const { products, totalProducts } = useSelector(
    (state: any) => state.product
  );

  const [productList, setProductList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

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

  // UI
  const PLPView = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h2 className="text-lg font-semibold">
          {query
            ? `Search: ${query}`
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

      <div className="lg:p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {productList.map((p: any) => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="bg-white rounded-xl shadow-md p-3 cursor-pointer hover:shadow-xl transition"
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              className="h-40 w-full object-cover rounded"
              loading="lazy"
            />
            <h3 className="mt-2 font-semibold line-clamp-2">
              {p.title}
            </h3>
            <p className="text-gray-500 text-sm capitalize">
              {p.category}
            </p>
            <div className="flex justify-between mt-2">
              <span className="font-bold">₹{p.price}</span>
              <span className="text-yellow-500">
                ⭐ {p.rating}
              </span>
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
    <div className="lg:p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
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