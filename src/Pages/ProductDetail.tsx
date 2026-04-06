import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Detail</h1>

      <div className="border p-4 rounded">
        <p className="text-lg">Product ID: {id}</p>

        <button className="mt-4 bg-black text-white px-4 py-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;