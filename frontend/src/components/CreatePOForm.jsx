import { useEffect, useState } from "react";
import api from "../services/api";

import toast from "react-hot-toast";

function CreatePOForm({ onSuccess }) {
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);

  const [vendorId, setVendorId] = useState("");

  const [items, setItems] = useState([
    {
      productId: "",
      qty: 1,
      unitPrice: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const vendorsRes = await api.get("/vendors");
    const productsRes = await api.get("/products");

    setVendors(vendorsRes.data.data);
    setProducts(productsRes.data.data);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];

    updatedItems[index][field] =
      field === "qty" || field === "unitPrice"
        ? Number(value)
        : value;

    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        productId: "",
        qty: 1,
        unitPrice: "",
      },
    ]);
  };

  const removeItem = (index) => {
    if (items.length === 1) return;

    const updatedItems = items.filter(
      (_, i) => i !== index
    );

    setItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/purchase-orders", {
        vendorId: Number(vendorId),
        items,
      });

      toast.success("Purchase Order Created Successfully");

      setVendorId("");

      setItems([
        {
          productId: "",
          qty: 1,
          unitPrice: "",
        },
      ]);

      onSuccess();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow mb-8"
    >
      <h2 className="text-xl font-bold mb-4">
        Create Purchase Order
      </h2>

      <div className="mb-5">

        <label className="block mb-2 font-medium">
          Vendor
        </label>

        <select
          className="border rounded w-full p-2"
          value={vendorId}
          onChange={(e) =>
            setVendorId(e.target.value)
          }
          required
        >
          <option value="">Select Vendor</option>

          {vendors.map((vendor) => (
            <option
              key={vendor.id}
              value={vendor.id}
            >
              {vendor.name}
            </option>
          ))}

        </select>

      </div>

      {items.map((item, index) => (

        <div
          key={index}
          className="grid grid-cols-4 gap-3 mb-4"
        >

          <select
            className="border rounded p-2"
            value={item.productId}
            onChange={(e) =>
              handleItemChange(
                index,
                "productId",
                Number(e.target.value)
              )
            }
            required
          >
            <option value="">Product</option>

            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name}
              </option>
            ))}

          </select>

          <input
            type="number"
            placeholder="Qty"
            value={item.qty}
            min="1"
            onChange={(e) =>
              handleItemChange(
                index,
                "qty",
                e.target.value
              )
            }
            className="border rounded p-2"
          />

          <input
            type="number"
            placeholder="Unit Price"
            value={item.unitPrice}
            min="1"
            onChange={(e) =>
              handleItemChange(
                index,
                "unitPrice",
                e.target.value
              )
            }
            className="border rounded p-2"
          />

          <button
            type="button"
            onClick={() => removeItem(index)}
            className="bg-red-500 text-white rounded"
          >
            Remove
          </button>

        </div>

      ))}

      <button
        type="button"
        onClick={addItem}
        className="bg-gray-700 text-white px-4 py-2 rounded mr-4"
      >
        + Add Item
      </button>

      <button
  type="submit"
  disabled={loading}
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:bg-gray-400 transition"
>
  {loading ? "Creating..." : "Create Purchase Order"}
</button>

    </form>
  );
}

export default CreatePOForm;