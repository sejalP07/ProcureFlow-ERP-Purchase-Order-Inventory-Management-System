const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to ProcureFlow API 🚀",
  });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);

app.use(errorHandler);

module.exports = app;
