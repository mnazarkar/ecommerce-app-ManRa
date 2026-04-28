import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

interface Review {
  rating: number;
  comment: string;
  reviewerName: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  images: string[];
  reviews: Review[];
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      {/* Images */}
      <div>
        <img
          src={product.images[0]}
          className="w-full h-80 object-cover rounded"
        />

        <div className="flex gap-2 mt-2">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-16 h-16 object-cover rounded border"
            />
          ))}
        </div>
      </div>

      {/* Details */}
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>

        <p className="text-gray-500 mt-1">{product.brand}</p>

        <p className="mt-3">{product.description}</p>

        <div className="mt-4 flex items-center gap-4">
          <span className="text-xl font-bold">
            ₹{product.price}
          </span>
          <span className="text-yellow-500">
            ⭐ {product.rating}
          </span>
        </div>

        <p className="mt-2 text-sm">
          Stock:{" "}
          <span
            className={
              product.stock > 10
                ? "text-green-600"
                : "text-red-500"
            }
          >
            {product.stock > 10 ? "In Stock" : "Low Stock"}
          </span>
        </p>

        <button className="mt-4 bg-linear-to-bl from-violet-500 to-fuchsia-500 text-white px-4 py-2 rounded">
          Add to Cart
        </button>
      </div>

      {/* Reviews */}
      <div className="md:col-span-2 mt-6">
        <h2 className="text-xl font-semibold mb-3">
          Reviews
        </h2>

        <div className="space-y-3">
          {product.reviews.map((review, index) => (
            <div
              key={index}
              className="border p-3 rounded"
            >
              <p className="font-semibold">
                {review.reviewerName}
              </p>
              <p className="text-yellow-500">
                ⭐ {review.rating}
              </p>
              <p className="text-sm text-gray-600">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;