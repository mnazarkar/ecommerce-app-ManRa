import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchSearchedProductList } from "../actions/productActions";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if (!query.trim()) return;
    console.log("Search submitted:", query);
    dispatch(fetchSearchedProductList(query));
    setOpen(false);
    navigate(`/products/search?q=${encodeURIComponent(query)}`);
  };

  // Focus when open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center">
      
      {/* Search Icon (always visible) */}
      {!open && <Search
        className="cursor-pointer z-10 invert"
        size={22}
        onClick={() => setOpen(true)}
      />}

      {/* Animated Input */}
      <div className={`fixed inset-0 bg-black/50 w-full h-full z-100 ${open ? "flex" : "hidden"}`} onClick={() => setOpen(false)}></div>
        <div
          className={`
            fixed left-0 items-center w-full flex justify-center
            transition-all duration-300 ease-in-out z-200
            ${open ? "flex" : "hidden"}
          `}
        >
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="relative flex flex-row items-center w-[80%]">
            <input
              ref={inputRef}
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              className="
                w-full border rounded-full py-2 pl-10 pr-10
                focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white
              "
            />

            {/* Left icon inside input */}
            <Search
              className="absolute left-3 text-gray-500 cursor-pointer"
              size={18}
              onClick={handleSubmit}
            />

            {/* Close icon */}
            <X
              className="absolute right-3 cursor-pointer text-gray-500"
              size={18}
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
            />
          </form>
        </div>
    </div>
  );
};

export default SearchBar;