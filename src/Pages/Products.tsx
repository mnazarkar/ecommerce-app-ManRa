import { Link } from "react-router-dom";

const mockProducts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  price: 100 + i * 10,
}));

const Products = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockProducts.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="border p-4 rounded hover:shadow"
          >
            <h2 className="font-semibold">{product.title}</h2>
            <p>₹{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;