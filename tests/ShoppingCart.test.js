const ShoppingCart = require('../src/ShoppingCart');

describe('ShoppingCart', () => {
  let cart;

  beforeEach(() => {
    // Arrange (state awal setiap test)
    cart = new ShoppingCart();
  });

  describe('addItem', () => {
    test('should add item when valid item given', () => {
      // Arrange
      const item = { name: 'Book', price: 50000 };
      // Act
      cart.addItem(item);
      // Assert
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].name).toBe('Book');
    });

    test('should increment quantity when same item added twice', () => {
      // Arrange
      const item = { name: 'Book', price: 50000 };
      // Act
      cart.addItem(item);
      cart.addItem(item);
      // Assert
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].quantity).toBe(2);
    });

    test('should add given quantity when same item added with quantity', () => {
      // Arrange
      cart.addItem({ name: 'Book', price: 50000 });
      // Act
      cart.addItem({ name: 'Book', price: 50000, quantity: 3 });
      // Assert
      expect(cart.items[0].quantity).toBe(4);
    });

    test('should throw error when item has no name', () => {
      // Arrange
      const item = { price: 1000 };
      // Act
      const act = () => cart.addItem(item);
      // Assert
      expect(act).toThrow('Invalid item');
    });

    test('should throw error when item is null', () => {
      // Arrange
      const item = null;
      // Act
      const act = () => cart.addItem(item);
      // Assert
      expect(act).toThrow('Invalid item');
    });

    test('should throw error when item has no price', () => {
      // Arrange
      const item = { name: 'Book' };
      // Act
      const act = () => cart.addItem(item);
      // Assert
      expect(act).toThrow('Invalid item');
    });

    test('should throw error when price is negative', () => {
      // Arrange
      const item = { name: 'X', price: -1 };
      // Act
      const act = () => cart.addItem(item);
      // Assert
      expect(act).toThrow('Price cannot be negative');
    });
  });

  describe('removeItem', () => {
    test('should remove item when existing item name given', () => {
      // Arrange
      cart.addItem({ name: 'Book', price: 50000 });
      // Act
      cart.removeItem('Book');
      // Assert
      expect(cart.items).toHaveLength(0);
    });

    test('should throw error when removing non-existent item', () => {
      // Arrange
      const name = 'Ghost';
      // Act
      const act = () => cart.removeItem(name);
      // Assert
      expect(act).toThrow('Item not found');
    });
  });

  describe('calculateSubtotal', () => {
    test('should return 0 when cart is empty', () => {
      // Act
      const result = cart.calculateSubtotal();
      // Assert
      expect(result).toBe(0);
    });

    test('should sum price times quantity when cart has items', () => {
      // Arrange
      cart.addItem({ name: 'Book', price: 50000, quantity: 2 });
      cart.addItem({ name: 'Pen', price: 10000 });
      // Act
      const result = cart.calculateSubtotal();
      // Assert
      expect(result).toBe(110000);
    });
  });

  describe('calculateTotal', () => {
    test('should return subtotal when no discount and no tax', () => {
      // Arrange
      cart.addItem({ name: 'Book', price: 100000 });
      // Act
      const result = cart.calculateTotal();
      // Assert
      expect(result).toBe(100000);
    });

    test('should apply discount when discount rate given', () => {
      // Arrange
      cart.addItem({ name: 'Book', price: 100000 });
      // Act
      const result = cart.calculateTotal(0.1);
      // Assert
      expect(result).toBe(90000);
    });

    test('should apply discount then tax when both given', () => {
      // Arrange
      cart.addItem({ name: 'Book', price: 100000 });
      // Act (100000 * 0.9 = 90000, lalu * 1.11 = 99900)
      const result = cart.calculateTotal(0.1, 0.11);
      // Assert
      expect(result).toBe(99900);
    });

    test('should throw error when discount out of range', () => {
      // Act
      const act = () => cart.calculateTotal(1.5);
      // Assert
      expect(act).toThrow('Invalid discount rate');
    });

    test('should throw error when tax out of range', () => {
      // Act
      const act = () => cart.calculateTotal(0, -0.1);
      // Assert
      expect(act).toThrow('Invalid tax rate');
    });
  });

  describe('getItemCount', () => {
    test('should return 0 when cart is empty', () => {
      // Act
      const result = cart.getItemCount();
      // Assert
      expect(result).toBe(0);
    });

    test('should sum all quantities when cart has items', () => {
      // Arrange
      cart.addItem({ name: 'A', price: 1, quantity: 3 });
      cart.addItem({ name: 'B', price: 1, quantity: 2 });
      // Act
      const result = cart.getItemCount();
      // Assert
      expect(result).toBe(5);
    });
  });

  describe('clear', () => {
    test('should empty the cart when cart has items', () => {
      // Arrange
      cart.addItem({ name: 'A', price: 1 });
      // Act
      cart.clear();
      // Assert
      expect(cart.items).toHaveLength(0);
    });
  });
});
