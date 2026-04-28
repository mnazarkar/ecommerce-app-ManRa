import { useEffect, useState } from "react";
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
import { ChevronLeft, ChevronRight } from "lucide-react";

const LIMIT = 21;

const ProductList = () => {
  const { products, totalProducts, loading } = useSelector(
    (state: any) => state.product
  );

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");

  const totalPages = Math.ceil(totalProducts / LIMIT);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [category, query, sortBy, order]);

  // Main API logic
  useEffect(() => {
    const skip = (page - 1) * LIMIT;

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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h2 className="text-lg font-semibold">
          {query
            ? `Search: ${query}`
            : category
            ? `Category: ${category}`
            : "All Products"}
        </h2>

        {/* Sort */}
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

      {/* Loader */}
      {loading && (
        <p className="text-center py-10">Loading...</p>
      )}

      {/* Empty */}
      {!loading && products.length === 0 && (
        <p className="text-center py-10">No products found</p>
      )}

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p: any) => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="border p-4 rounded cursor-pointer hover:shadow-lg transition"
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              className="h-40 w-full object-cover rounded"
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2 flex-wrap items-center">
          {/* Prev */}
          <button
            className="px-3 py-1 border flex items-center gap-1 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft size={16} /> Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, page - 3),
              Math.min(totalPages, page + 2)
            )
            .map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 border cursor-pointer ${
                  page === p
                    ? "bg-linear-to-bl from-violet-500 to-fuchsia-500 text-white"
                    : "bg-white"
                }`}
              >
                {p}
              </button>
            ))}

          {/* Next */}
          <button
            className="px-3 py-1 border flex items-center gap-1 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;