import { Link } from "react-router-dom";
import { ShoppingCart, User, Heart } from "lucide-react";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const Header = () => {
  const authState = useSelector((state: any) => state.auth);
  const cartState = useSelector((state: any) => state.cart);
  const { isAuthenticated, user } = authState;
  return (
    <header className="w-full bg-linear-to-bl from-violet-500 to-fuchsia-500 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 justify-between">

        <div className="flex items-center gap-2">
            <Navbar />
          {/* 🔹 Logo */}
        <Link to="/" className="text-xl font-bold whitespace-nowrap text-white">
          ManRa
        </Link>
        </div>

        {/* 🔹 Right Section */}
        <div className="flex items-center gap-6 text-sm">

          <div className="">
            <SearchBar />
          </div>
          <Heart size={24} className="invert cursor-pointer"/>
          
          <Link to="/login" className="flex items-center gap-1">
            <User size={18} className="invert"/>
            {isAuthenticated ? (
              <span className="hidden sm:block text-white">Hi, {user.firstName}</span>
            ) : (
              <span className="hidden sm:block text-white">Login</span>
            )}
          </Link>

          <Link to="/cart" className="relative flex items-center gap-1">
            <ShoppingCart size={20} className="invert"/>
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {cartState.totalQuantity}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;