import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../actions/productActions";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  category: string;
}

const ProductList = () => {
    const { products } = useSelector((state: any) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    console.log('fetching products...');
    dispatch(fetchProducts());
  }, []);

  console.log(products);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product: Product) => (
        <div
          key={product.id}
          onClick={() => navigate(`/product/${product.id}`)}
          className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-40 object-cover rounded"
          />

          <h3 className="font-semibold mt-2 line-clamp-2">
            {product.title}
          </h3>

          <p className="text-gray-500 text-sm capitalize">
            {product.category}
          </p>

          <div className="flex justify-between items-center mt-2">
            <span className="font-bold">₹{product.price}</span>
            <span className="text-yellow-500">
              ⭐ {product.rating}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;