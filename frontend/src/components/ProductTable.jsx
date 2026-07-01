function ProductTable({ products }) {
  // Show message if there are no products
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          No Products Found
        </h2>

        <p className="text-gray-500 mt-2">
          Inventory is currently empty.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="text-left px-6 py-3">ID</th>
            <th className="text-left px-6 py-3">Product</th>
            <th className="text-left px-6 py-3">SKU</th>
            <th className="text-left px-6 py-3">Current Stock</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4">{product.id}</td>

              <td className="px-6 py-4 font-semibold">
                {product.name}
              </td>

              <td className="px-6 py-4">{product.sku}</td>

              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    product.stock < 10
                      ? "bg-red-100 text-red-700"
                      : product.stock < 30
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {product.stock}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;