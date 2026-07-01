const calculateTotal = require("../utils/calculateTotal");

const {
  createPurchaseOrder,
  getAllPurchaseOrders,
  getPurchaseOrderById,
  approvePurchaseOrder,
  receivePurchaseOrder,
} = require("../services/purchaseOrderService");

const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

const {
  successResponse,
} = require("../utils/apiResponse");

// Create Purchase Order
const createPO = asyncHandler(async (req, res) => {
  const { vendorId, items } = req.body;

  const po = createPurchaseOrder(vendorId, items);

  successResponse(
    res,
    201,
    "Purchase Order created successfully.",
    {
      ...po,
      total: calculateTotal(po.items),
    }
  );
});

// Get All Purchase Orders
const getPOs = asyncHandler(async (req, res) => {
  const purchaseOrders = getAllPurchaseOrders();

  const result = purchaseOrders.map((po) => ({
    ...po,
    total: calculateTotal(po.items),
  }));

  successResponse(
    res,
    200,
    "Purchase Orders fetched successfully.",
    result
  );
});
// Get Purchase Order By ID
const getPOById = asyncHandler(async (req, res) => {
  const po = getPurchaseOrderById(req.params.id);

  if (!po) {
    throw new AppError("Purchase Order not found.", 404);
  }

  successResponse(
    res,
    200,
    "Purchase Order fetched successfully.",
    {
      ...po,
      total: calculateTotal(po.items),
    }
  );
});

const approvePO = asyncHandler(async (req, res) => {
  const role = req.query.role;

  const po = approvePurchaseOrder(
    req.params.id,
    role
  );

  successResponse(
    res,
    200,
    "Purchase Order approved successfully.",
    {
      ...po,
      total: calculateTotal(po.items),
    }
  );
});


const receivePO = asyncHandler(async (req, res) => {
  const po = receivePurchaseOrder(req.params.id);

  successResponse(
    res,
    200,
    "Goods received successfully.",
    {
      ...po,
      total: calculateTotal(po.items),
    }
  );
});


module.exports = {
  createPO,
  getPOs,
  getPOById,
  approvePO,
  receivePO,
};