import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
}

const Recommendations = ({
  title,
  category,
  limit = 6,
  random = false,
}: any) => {
  const [items, setItems] = useState<Product[]>([]);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let res;

      if (random) {
        const skip = Math.floor(Math.random() * 50);
        res = await api.get(`/products?limit=${limit}&skip=${skip}`);
      } else {
        res = await api.get(
          `/products/category/${category}?limit=${limit}`
        );
      }

      setItems(res.data.products || res.data);
    };

    fetchData();
  }, [category]);

  // 🔥 scroll functions
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {/* LEFT ARROW */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
        bg-black/10 shadow-md p-2 rounded-full hover:scale-110 transition cursor-pointer"
      >
        <ChevronLeft />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
        bg-black/10 shadow-md p-2 rounded-full hover:scale-110 transition cursor-pointer"
      >
        <ChevronRight />
      </button>

      {/* SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-1"
      >
        {items.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="min-w-[160px] bg-white rounded-xl shadow-md p-2 cursor-pointer hover:shadow-xl transition"
          >
            <img
              src={p.thumbnail}
              className="h-32 w-full object-cover rounded"
            />
            <p className="text-sm mt-2 line-clamp-2">
              {p.title}
            </p>
            <p className="font-semibold">₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;