import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import api from "../services/api";

import PurchaseOrderCard from "../components/PurchaseOrderCard";

import CreatePOForm from "../components/CreatePOForm";

function PurchaseOrders() {

  const [purchaseOrders, setPurchaseOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchPurchaseOrders = async () => {

    try {

      setLoading(true);

      const response = await api.get("/purchase-orders");

      setPurchaseOrders(response.data.data);

      setError("");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Failed to load purchase orders."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const approvePO = async (id) => {
  try {
    await api.post(`/purchase-orders/${id}/approve`);

    toast.success("Purchase Order Approved Successfully");

    fetchPurchaseOrders();

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Approval Failed"
    );

  }
};

const receivePO = async (id) => {
  try {

    await api.post(`/purchase-orders/${id}/receive`);

    toast.success("Goods Received Successfully");

    fetchPurchaseOrders();

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Receive Failed"
    );
  }
  
};

  if (loading)
    return (
      <h2 className="text-xl font-bold">
        Loading Purchase Orders...
      </h2>
    );

  if (error)
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        {error}
      </div>
    );

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

  <div>

    <h1 className="text-3xl font-bold">
      Purchase Orders
    </h1>

    <p className="text-gray-500">
      Manage procurement workflow
    </p>

  </div>

  <button
    onClick={fetchPurchaseOrders}
    className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg transition"
  >
    Refresh
  </button>

</div>

      <CreatePOForm onSuccess={fetchPurchaseOrders} />

      <div className="grid gap-6">

        {purchaseOrders.length === 0 ? (

          <div className="bg-white rounded-xl p-8 text-center shadow">

            No Purchase Orders Found

          </div>

        ) : (

          purchaseOrders.map((purchaseOrder) => (

            <PurchaseOrderCard
              key={purchaseOrder.id}
              purchaseOrder={purchaseOrder}
              onApprove={approvePO}
              onReceive={receivePO}
            />

          ))

        )}

      </div>

    </div>
  );
}

export default PurchaseOrders;