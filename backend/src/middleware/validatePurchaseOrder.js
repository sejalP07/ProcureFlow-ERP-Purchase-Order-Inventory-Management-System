const AppError = require("../utils/AppError");

const validatePurchaseOrder = (
  req,
  res,
  next
) => {
  const { vendorId, items } = req.body;

  if (!vendorId) {
    return next(
      new AppError(
        "vendorId is required.",
        400
      )
    );
  }

  if (!Array.isArray(items) || items.length === 0) {
    return next(
      new AppError(
        "At least one item is required.",
        400
      )
    );
  }

  next();
};

module.exports = validatePurchaseOrder;