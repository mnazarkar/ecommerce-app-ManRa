import { useEffect, useRef, useState } from "react";
import {
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductListByCategory,
  fetchSearchedProductList,
} from "../actions/productActions";
import { CircleArrowUp } from "lucide-react";
import ProductCard from "../Components/ProductCard";

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
  const [showBackToTop, setShowBackToTop] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch<any>();

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

  // Handle Back To Top
  useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };
  scrollToTop();

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  // UI
  const PLPView = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <h2 className="text-xl font-bold">
            {query
              ? `Search: ${query}`
              : category
                ? category
                : "All Products"}
          </h2>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full shadow-sm"
            >
              <option value="title">Title</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>

            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full shadow-sm"
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
            <ProductCard p={p}/>
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
        {
          showBackToTop && 
          <div className="fixed bottom-4 right-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center flex-col bg-linear-to-bl from-violet-500 to-fuchsia-500 w-10 h-10 rounded-full" onClick={scrollToTop}>
              <CircleArrowUp size={24} className="invert"/>
            </div>
            <span className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Back To Top</span>
          </div>
        }
      </div>
    );
  };
  const skeletonView = () => {
    return (
      <div className="lg:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-2 animate-pulse">
            <div className="h-60 bg-gray-300 rounded" />
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