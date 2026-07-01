function calculateTotal(items) {
  return items.reduce((total, item) => {
    return total + item.qty * item.unitPrice;
  }, 0);
}

module.exports = calculateTotal;