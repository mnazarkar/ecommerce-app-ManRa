import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../Components/Carousel";
import {
  Shirt,
  Watch,
  Smartphone,
  Laptop,
  ShoppingBag,
  Home,
  Sparkles,
  Bike,
  Gem,
  Glasses,
  Utensils,
  Flower2,
  Dumbbell,
} from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

const categorySections = [
  {
    title: "Fashion",
    items: [
      { name: "mens-shirts", icon: Shirt },
      { name: "mens-shoes", icon: ShoppingBag },
      { name: "mens-watches", icon: Watch },
      { name: "womens-dresses", icon: Shirt },
      { name: "womens-shoes", icon: ShoppingBag },
      { name: "womens-bags", icon: ShoppingBag },
      { name: "womens-jewellery", icon: Gem },
      { name: "womens-watches", icon: Watch },
      { name: "sunglasses", icon: Glasses },
      { name: "tops", icon: Shirt },
    ],
  },
  {
    title: "Electronics",
    items: [
      { name: "smartphones", icon: Smartphone },
      { name: "laptops", icon: Laptop },
      { name: "tablets", icon: Laptop },
      { name: "mobile-accessories", icon: Smartphone },
    ],
  },
  {
    title: "Beauty & Care",
    items: [
      { name: "beauty", icon: Sparkles },
      { name: "skin-care", icon: Sparkles },
      { name: "fragrances", icon: Flower2 },
    ],
  },
  {
    title: "Home & Living",
    items: [
      { name: "furniture", icon: Home },
      { name: "home-decoration", icon: Home },
      { name: "kitchen-accessories", icon: Utensils },
      { name: "groceries", icon: ShoppingBag },
    ],
  },
  {
    title: "Sports & Vehicles",
    items: [
      { name: "sports-accessories", icon: Dumbbell },
      { name: "motorcycle", icon: Bike },
      { name: "vehicle", icon: Bike },
    ],
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Random featured products
  useEffect(() => {
  const fetchData = async () => {
    try {
      const randomSkip = Math.floor(Math.random() * 80);

      const res = await fetch(
        `https://dummyjson.com/products?limit=8&skip=${randomSkip}`
      );

      const data = await res.json();
      setFeaturedProducts(data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  return (
    <div className="space-y-10 pb-10">

      <Carousel />

      <div className="px-4 grid md:grid-cols-3 gap-4">
        <div
          onClick={() => navigate("/products")}
          className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white p-6 rounded-2xl shadow cursor-pointer"
        >
          <h2 className="text-lg font-semibold">Summer Sale</h2>
          <p className="text-sm">Up to 50% off</p>
        </div>

        <div
          onClick={() => navigate("/products/smartphones")}
          className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-6 rounded-2xl shadow cursor-pointer"
        >
          <h2 className="text-lg font-semibold">Electronics</h2>
          <p className="text-sm">Latest gadgets</p>
        </div>

        <div
          onClick={() => navigate("/products/womens-dresses")}
          className="bg-gradient-to-br from-pink-500 to-rose-500 text-white p-6 rounded-2xl shadow cursor-pointer"
        >
          <h2 className="text-lg font-semibold">Fashion Picks</h2>
          <p className="text-sm">Trending styles</p>
        </div>
      </div>

      <div className="space-y-8 px-4">
        {categorySections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-semibold mb-4">
              {section.title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {section.items.map((cat) => {
                const Icon = cat.icon;

                return (
                  <div
                    key={cat.name}
                    onClick={() =>
                      navigate(`/products/${cat.name}`)
                    }
                    className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center cursor-pointer hover:shadow-xl transition"
                  >
                    <div className="bg-gray-100 p-3 rounded-full mb-2">
                      <Icon size={22} />
                    </div>
                    <p className="text-sm capitalize">
                      {cat.name.replace("-", " ")}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="px-4">
        <h2 className="text-xl font-semibold mb-4">
          Featured Products
        </h2>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="bg-white rounded-xl shadow-md p-3 cursor-pointer hover:shadow-xl transition"
              >
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="h-40 w-full object-cover rounded mb-2"
                />
                <p className="text-sm font-medium line-clamp-2">
                  {p.title}
                </p>
                <p className="text-sm font-bold mt-1">
                  ₹{p.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-4">
        <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-2 bg-gradient-to-bl from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Discover More
          </h2>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate("/products?sortBy=price&order=asc")}
              className="bg-white text-black px-4 py-1 rounded-full text-sm cursor-pointer"
            >
              <span className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                Budget Deals
              </span>
            </button>

            <button
              onClick={() => navigate("/products?sortBy=rating&order=desc")}
              className="bg-white text-black px-4 py-1 rounded-full text-sm cursor-pointer"
            >
              <span className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                Top Rated
              </span>
            </button>

            <button
              onClick={() => navigate("/products/smartphones")}
              className="bg-white text-black px-4 py-1 rounded-full text-sm cursor-pointer"
            >
              <span className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                Smartphones
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;