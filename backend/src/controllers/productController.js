const products = require("../data/products");

// GET /api/products
const getProducts = (req, res) => {
  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
};

module.exports = {
  getProducts,
};