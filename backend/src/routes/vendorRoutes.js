const express = require("express");
const router = express.Router();

const { getVendors } = require("../controllers/vendorController");

// GET /api/vendors
router.get("/", getVendors);

module.exports = router;