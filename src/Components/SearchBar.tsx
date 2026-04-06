import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      console.log("API Call for:", debouncedQuery);

      // 👉 Replace with API call later
    }
  }, [debouncedQuery]);

  return (
    <div className="relative w-full max-w-md">
      {/* Input */}
      <input
        type="text"
        placeholder="Search products..."
        className="w-full border rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Icon */}
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        size={18}
      />
    </div>
  );
};

export default SearchBar;