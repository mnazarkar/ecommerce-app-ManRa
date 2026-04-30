import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
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

  const checkScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll(); // initial check

    el.addEventListener("scroll", checkScroll);

    return () => el.removeEventListener("scroll", checkScroll);
  }, [items]);

  // scroll functions
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    if (dir === "left" && !canScrollLeft) return;
    if (dir === "right" && !canScrollRight) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {/* LEFT ARROW */}
      <button
        onClick={() => scroll("left")}
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 z-10
          p-1 md:p-2 rounded-full shadow-md transition
          ${canScrollLeft ? "bg-white hover:scale-110 cursor-pointer" : "bg-gray-200 cursor-not-allowed opacity-50"}
        `}
      >
        <ChevronLeft />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scroll("right")}
        className={`
          absolute right-0 top-1/2 -translate-y-1/2 z-10
          p-1 md:p-2 rounded-full shadow-md transition
          ${canScrollRight ? "bg-white hover:scale-110 cursor-pointer" : "bg-gray-200 cursor-not-allowed opacity-50"}
        `}
      >
        <ChevronRight />
      </button>

      {/* SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-1 py-3 snap-x"
      >
        {items.map((p) => (
          <ProductCard p={p} extraClass={'snap-start'} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;