const express = require("express");

const router = express.Router();
const validatePurchaseOrder = require("../middleware/validatePurchaseOrder");

const {
  createPO,
  getPOs,
  getPOById,
  approvePO,
  receivePO,
} = require("../controllers/purchaseOrderController");

router.get("/", getPOs);

router.get("/:id", getPOById);

router.post("/", validatePurchaseOrder, createPO);

router.post("/:id/approve", approvePO);

router.post("/:id/receive", receivePO);

module.exports = router;