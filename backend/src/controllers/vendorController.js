const vendors = require("../data/vendors");

// GET /api/vendors
const getVendors = (req, res) => {
  res.status(200).json({
    success: true,
    count: vendors.length,
    data: vendors,
  });
};

module.exports = {
  getVendors,
};