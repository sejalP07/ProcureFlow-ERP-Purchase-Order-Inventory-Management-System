import { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import api from "../services/api";


function Inventory() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const totalStock = products.reduce(
    (sum, product) => sum + product.stock,
    0
    );

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/products");

      setProducts(response.data.data);

      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

  fetchProducts();

  const interval = setInterval(() => {
    fetchProducts();
  }, 3000);

  return () => clearInterval(interval);

}, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl font-semibold text-gray-600">
            Loading Inventory...
        </p>
        </div>
    );
  }

  if (error) {
    return (
    <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg">
        <h2 className="font-semibold">Error</h2>
        <p>{error}</p>
    </div>
    );
  }

  return (
    <div>
        <div className="flex justify-between items-center mb-6">

        <div>

    <h1 className="text-3xl font-bold">
      Inventory Dashboard
    </h1>

    <p className="text-gray-500">
      Current product stock levels
    </p>

  </div>

  <div className="flex gap-4">

    <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-5 rounded-xl shadow-lg">

      <h3 className="text-sm uppercase">
        Total Products
      </h3>

      <p className="text-2xl font-bold">
        {products.length}
      </p>

    </div>

    <div className="bg-linear-to-r from-green-600 to-green-700 text-white px-6 py-5 rounded-xl shadow-lg">

      <h3 className="text-sm uppercase">
        Total Stock
      </h3>

      <p className="text-2xl font-bold">
        {totalStock}
      </p>

    </div>

  </div>

</div>
      

      <ProductTable products={products} />

    </div>
  );
}

export default Inventory;