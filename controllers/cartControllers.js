// Importing the User model
const User = require('../models/user');

// Controller to add a product to the cart
const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const user = await User.findById(userId); // Find user by ID
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.cart.set(productId, (user.cart.get(productId) || 0) + quantity); // Add product to cart
        await user.save(); // Save the user document
        res.json(user.cart); // Respond with the updated cart
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to get the user's cart
const getCart = async (req, res) => {
    const { userId } = req.query;
    try {
        const user = await User.findById(userId); // Find user by ID
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.cart); // Respond with the user's cart
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to remove a product from the cart
const removeFromCart = async (req, res) => {
    const { userId } = req.body;
    const { productId } = req.params;
    try {
        const user = await User.findById(userId); // Find user by ID
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.cart.delete(productId); // Remove product from cart
        await user.save(); // Save the user document
        res.json(user.cart); // Respond with the updated cart
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart
}; // Exporting the controllers to use in the routes
