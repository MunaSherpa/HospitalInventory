
const cart = require('../../model/pharmacy/cartSchema')
const Product = require("../../model/pharmacy/product");

/*** Add a product to the user's cart.
 
 */
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user; // Assuming you have implemented user authentication

  try {
    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(403).json({ success: false, error: 'Product not found' });
    }

    // Check if the product is already in the user's cart
    let cartItem = await Cart.findOne({ product: productId, user: userId });
    if (cartItem) {
      // If the product is already in the cart, update the quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // If the product is not in the cart, create a new cart item
      cartItem = await Cart.create({ product: productId, quantity, user: userId });
    }

    return res.status(200).json({ success: true, message: 'Product added to cart successfully', cartItem });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

/**
 * Get the user's cart.
 */
const getUserCart = async (req, res) => {
  const userId = req.user._id; // Assuming you have implemented user authentication

  try {
    // Find all cart items for the user
    const cartItems = await Cart.find({ user: userId }).populate('product');

    return res.status(200).json({ success: true, cartItems });
  } catch (error) {
    console.error('Error fetching user cart:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

/**
 * Remove a product from the user's cart.
 */
const removeFromCart = async (req, res) => {
  const { cartItemId } = req.params;

  try {
    // Find the cart item by ID and remove it
    await Cart.findByIdAndDelete(cartItemId);

    return res.status(200).json({ success: true, message: 'Product removed from cart successfully' });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

/**
 * Calculate the total price of the user's cart.
 
 */
const calculateTotal = async (req, res) => {
  const userId = req.user._id; // Assuming you have implemented user authentication

  try {
    // Find all cart items for the user
    const cartItems = await Cart.find({ user: userId }).populate('product');

    // Calculate the total price by iterating over each cart item
    let totalPrice = 0;
    for (const cartItem of cartItems) {
      const productPrice = cartItem.product.price;
      const quantity = cartItem.quantity;
      const subtotal = productPrice * quantity;
      totalPrice += subtotal;
    }

    return res.status(200).json({ success: true, totalPrice });
  } catch (error) {
    console.error('Error calculating total:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = {
  addToCart,
  getUserCart,
  removeFromCart,
  calculateTotal,
};
