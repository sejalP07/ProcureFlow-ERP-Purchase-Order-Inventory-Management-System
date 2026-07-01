const purchaseOrders = require("../data/purchaseOrders");
const vendors = require("../data/vendors");
const products = require("../data/products");

const AppError = require("../utils/AppError");

// Create Purchase Order
const createPurchaseOrder = (vendorId, items) => {
  const vendor = vendors.find((v) => v.id === vendorId);

  if (!vendor) {
    throw new AppError("Vendor not found.",404);
  }

  if (!items || items.length === 0) {
    throw new AppError("Purchase order must contain at least one item.",400);
  }

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      throw new AppError(`Product ${item.productId} not found.`,404);
    }

    if (item.qty <= 0) {
      throw new AppError("Quantity must be greater than zero.",400);
    }

    if (item.unitPrice <= 0) {
      throw new AppError("Unit price must be greater than zero.",400);
    }
  }

  const newPO = {
    id: purchaseOrders.length + 1,
    vendorId,
    status: "draft",
    createdAt: new Date().toISOString(),
    items,
  };

  purchaseOrders.push(newPO);

  return newPO;
};

// Get All Purchase Orders
const getAllPurchaseOrders = () => {
  return purchaseOrders.map((po) => {
    const vendor = vendors.find(
      (v) => v.id === po.vendorId
    );

    return {
  ...po,
  vendorName: vendor
    ? vendor.name
    : "Unknown Vendor",

  items: po.items.map((item) => {
    const product = products.find(
      (p) => p.id === item.productId
    );

    return {
      ...item,
      productName: product
        ? product.name
        : "Unknown Product",
    };
  }),
};
  });
};

// Get Purchase Order By ID
const getPurchaseOrderById = (id) => {
  const po = purchaseOrders.find(
    (po) => po.id === Number(id)
  );

  if (!po) {
    return null;
  }

  const vendor = vendors.find(
    (v) => v.id === po.vendorId
  );

  return {
  ...po,
  vendorName: vendor
    ? vendor.name
    : "Unknown Vendor",

  items: po.items.map((item) => {
    const product = products.find(
      (p) => p.id === item.productId
    );

    return {
      ...item,
      productName: product
        ? product.name
        : "Unknown Product",
    };
  }),
};
};
// Approve Purchase Order
const approvePurchaseOrder = (id, role) => {
  const po = purchaseOrders.find((po) => po.id === Number(id));

  if (!po) {
    throw new AppError("Purchase Order not found.",404);
  }

  if (po.status !== "draft") {
    throw new AppError(
      `Only draft purchase orders can be approved. Current status: ${po.status}`,
      409
    );
  }

  // Bonus Rule: Manager approval for orders above 50,000
  const total = po.items.reduce(
    (sum, item) => sum + item.qty * item.unitPrice,
    0
  );

  if (total > 50000 && role !== "manager") {
  throw new AppError(
    "Manager approval required for purchase orders above ₹50,000.",
    403
  );
}

  po.status = "approved";

  return po;
};

// Receive Purchase Order
const receivePurchaseOrder = (id) => {
  const po = purchaseOrders.find((po) => po.id === Number(id));

  if (!po) {
    throw new AppError(
    "Purchase Order not found.",
    404
  );
  }

  if (po.status !== "approved") {
  throw new AppError(
    `Only approved purchase orders can be received. Current status: ${po.status}`,
     409
   );
  }

  if (po.status === "received") {
    throw new AppError(
      "Purchase Order has already been received.",
      409
    );
  }

  // Increase Inventory
  for (const item of po.items) {
    const product = products.find(
      (p) => p.id === item.productId
    );

    if (product) {
      product.stock += item.qty;
    }
  }

  po.status = "received";

  return po;
};


module.exports = {
  createPurchaseOrder,
  getAllPurchaseOrders,
  getPurchaseOrderById,
  approvePurchaseOrder,
  receivePurchaseOrder,
};