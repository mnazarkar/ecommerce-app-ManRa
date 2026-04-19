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

const LIMIT = 20;

const ProductList = () => {
  const { products, totalProducts } = useSelector(
    (state: any) => state.product
  );

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { category } = useParams(); // /category/:category
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // ?q=iphone

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(totalProducts / LIMIT);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    const skip = (page - 1) * LIMIT;

    if (query) {
      dispatch(fetchSearchedProductList(query, LIMIT, skip));
    } else if (category) {
      dispatch(fetchProductListByCategory(category, LIMIT, skip));
    } else {
      dispatch(fetchProducts(LIMIT, skip));
    }
  }, [page, category, query]);

  return (
    <div className="p-6">
      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p: any) => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="border p-4 rounded cursor-pointer hover:shadow"
          >
            <img src={p.thumbnail} className="h-40 w-full object-cover" />
            <h3 className="mt-2 font-semibold">{p.title}</h3>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        <button className="cursor-pointer px-3 py-1 border" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
          <ChevronLeft className="inline-block mr-1" size={16} />
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`cursor-pointer px-3 py-1 border ${page === p ? "bg-black text-white" : ""
                }`}
            >
              {p}
            </button>
          )
        )}
        <button
          className="cursor-pointer px-3 py-1 border"
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
        >
          Next
          <ChevronRight className="inline-block ml-1" size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProductList;