describe('Dummy Cart Controller Tests', () => {
    let cart;

    beforeEach(() => {
        cart = [];
    });

    it('should add an item to the cart', () => {
        const item = { id: 1, name: 'Apple', price: 0.5 };
        cart.push(item);
        expect(cart).toContain(item);
    });

    it('should calculate total price of the cart', () => {
        cart.push({ id: 1, name: 'Apple', price: 0.5 });
        cart.push({ id: 2, name: 'Banana', price: 0.3 });
        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        expect(totalPrice).toBe(0.8);
    });

    it('should remove an item from the cart', () => {
        const item = { id: 1, name: 'Apple', price: 0.5 };
        cart.push(item);
        cart = cart.filter(cartItem => cartItem.id !== item.id);
        expect(cart).not.toContain(item);
    });

    it('should count the number of items in the cart', () => {
        cart.push({ id: 1, name: 'Apple', price: 0.5 });
        cart.push({ id: 2, name: 'Banana', price: 0.3 });
        expect(cart.length).toBe(2);
    });

    it('should find an item by ID in the cart', () => {
        const item = { id: 1, name: 'Apple', price: 0.5 };
        cart.push(item);
        const foundItem = cart.find(cartItem => cartItem.id === item.id);
        expect(foundItem).toEqual(item);
    });

    it('should not find an item that is not in the cart', () => {
        const foundItem = cart.find(cartItem => cartItem.id === 99);
        expect(foundItem).toBeUndefined();
    });

    it('should clear the cart', () => {
        cart.push({ id: 1, name: 'Apple', price: 0.5 });
        cart.push({ id: 2, name: 'Banana', price: 0.3 });
        cart = [];
        expect(cart).toEqual([]);
    });

    it('should have an initial empty cart', () => {
        expect(cart).toEqual([]);
    });

    it('should update the quantity of an item in the cart', () => {
        const item = { id: 1, name: 'Apple', price: 0.5, quantity: 1 };
        cart.push(item);
        item.quantity = 2; 
        expect(cart[0].quantity).toBe(2);
    });

    it('should confirm item existence in the cart', () => {
        const item = { id: 1, name: 'Apple', price: 0.5 };
        cart.push(item);
        const itemExists = cart.some(cartItem => cartItem.id === item.id);
        expect(itemExists).toBe(true);
    });
});
