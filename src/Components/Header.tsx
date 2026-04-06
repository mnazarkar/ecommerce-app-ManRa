import { Link } from "react-router-dom";
import { ShoppingCart, MapPin, User } from "lucide-react";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 justify-between">

        {/* 🔹 Logo */}
        <Link to="/" className="text-xl font-bold whitespace-nowrap">
          ManRa
        </Link>

        {/* 🔹 Search Bar */}
        <div className="">
          <SearchBar />
        </div>

        {/* 🔹 Right Section */}
        <div className="flex items-center gap-6 text-sm">
          
          <Link to="/login" className="flex items-center gap-1">
            <User size={18} />
            <span className="hidden sm:block">Login</span>
          </Link>

          <div className="flex items-center gap-1 cursor-pointer">
            <MapPin size={18} />
            <span className="hidden sm:block">Address</span>
          </div>

          <Link to="/cart" className="relative flex items-center gap-1">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
              10
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;