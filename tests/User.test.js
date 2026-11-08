const User = require('../src/User');

describe('User', () => {
  describe('when created with valid data', () => {
    let user;

    beforeEach(() => {
      // Arrange
      user = new User('John', 'john@test.com', 25);
    });

    test('should return correct name', () => {
      // Act
      const result = user.getName();
      // Assert
      expect(result).toBe('John');
    });

    test('should return correct email', () => {
      // Act
      const result = user.getEmail();
      // Assert
      expect(result).toBe('john@test.com');
    });

    test('should return correct age', () => {
      // Act
      const result = user.getAge();
      // Assert
      expect(result).toBe(25);
    });
  });

  describe('when created with invalid data', () => {
    test('should throw error when name is empty', () => {
      expect(() => new User('', 'a@b.com', 25)).toThrow('Name required');
    });

    test('should throw error when name is only whitespace', () => {
      expect(() => new User('   ', 'a@b.com', 25)).toThrow('Name required');
    });

    test('should throw error when email is invalid', () => {
      expect(() => new User('John', 'invalid', 25)).toThrow('Invalid email');
    });

    test('should throw error when email is empty', () => {
      expect(() => new User('John', '', 25)).toThrow('Invalid email');
    });

    test('should throw error when age is negative', () => {
      expect(() => new User('John', 'a@b.com', -1)).toThrow('Invalid age');
    });

    test('should throw error when age exceeds 150', () => {
      expect(() => new User('John', 'a@b.com', 200)).toThrow('Invalid age');
    });
  });
});
