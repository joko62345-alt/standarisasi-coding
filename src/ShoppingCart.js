class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    if (!item || !item.name || item.price == null) {
      throw new Error('Invalid item');
    }
    if (item.price < 0) {
      throw new Error('Price cannot be negative');
    }
    const existing = this.items.find((i) => i.name === item.name);
    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      this.items.push({ ...item, quantity: item.quantity || 1 });
    }
  }

  removeItem(name) {
    const index = this.items.findIndex((i) => i.name === name);
    if (index === -1) {
      throw new Error('Item not found');
    }
    this.items.splice(index, 1);
  }

  calculateSubtotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  calculateTotal(discountRate = 0, taxRate = 0) {
    if (discountRate < 0 || discountRate > 1) {
      throw new Error('Invalid discount rate');
    }
    if (taxRate < 0 || taxRate > 1) {
      throw new Error('Invalid tax rate');
    }
    const subtotal = this.calculateSubtotal();
    const afterDiscount = subtotal * (1 - discountRate);
    return Math.round(afterDiscount * (1 + taxRate));
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  clear() {
    this.items = [];
  }
}

module.exports = ShoppingCart;
