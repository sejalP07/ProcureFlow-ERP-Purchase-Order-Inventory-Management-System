function PurchaseOrderCard({
  purchaseOrder,
  onApprove,
  onReceive,
}) {
  const statusStyles = {

    draft:
        "bg-yellow-100 text-yellow-700",

    approved:
        "bg-blue-100 text-blue-700",

    received:
        "bg-green-100 text-green-700",

};

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6">

      <div className="flex justify-between">

        <h2 className="text-xl font-bold">
          PO #{purchaseOrder.id}
        </h2>

        <span
  className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${
    statusStyles[purchaseOrder.status] ||
    "bg-gray-100 text-gray-700"
  }`}
>
          {purchaseOrder.status.toUpperCase()}
        </span>

      </div>

      <div className="mt-4 space-y-2">

        <p>
  <strong>Vendor:</strong>{" "}
  {purchaseOrder.vendorName}
</p>

<p>
  <strong>Created:</strong>{" "}
  {new Date(
    purchaseOrder.createdAt
  ).toLocaleDateString()}
</p>  

        <p>
          <strong>Total:</strong> ₹
          {purchaseOrder.total.toLocaleString()}
        </p>

        <div>
  <strong>Items</strong>

  <ul className="mt-3 space-y-2">
    {purchaseOrder.items.map((item, index) => (
      <li
        key={index}
        className="bg-gray-100 rounded-lg p-3"
      >
        <p>
          <strong>Product:</strong>{" "}
          {item.productName}
        </p>

        <p>
          <strong>Quantity:</strong>{" "}
          {item.qty}
        </p>

        <p>
          <strong>Unit Price:</strong> ₹
          {item.unitPrice.toLocaleString()}
        </p>
      </li>
    ))}
  </ul>
</div>

      </div>

      <div className="flex flex-wrap gap-3 mt-6">

        <button
  onClick={() => onApprove(purchaseOrder.id)}
  disabled={purchaseOrder.status !== "draft"}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 transition"
>
  Approve PO
</button>

        <button
  onClick={() => onReceive(purchaseOrder.id)}
  disabled={purchaseOrder.status !== "approved"}
  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 transition"
>
  Receive Goods
</button>
      </div>

    </div>
  );
}

export default PurchaseOrderCard;