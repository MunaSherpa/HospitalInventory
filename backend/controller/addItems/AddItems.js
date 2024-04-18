// const Product = require("../../model/pharmacy/product");


// exports.addProductItem = async (req, res) => {
//   const { username, email, productName, price, categories, quantity } = req.body;

//   if (!username || !email || !productName || !price || !categories || !quantity) {
//     return res.status(400).json({
//       message: "Please provide all the details"
//     });
//   }

//   try {
//     // Create a new product item
//     const newProduct = await Product.create({
//       username,
//       email,
//       productName,
//       price,
//       categories,
//       quantity
//     });

//     // Update the total stock quantity
//     const products = await Product.find();
//     let totalStock = 0;
//     products.forEach(product => {
//       totalStock += product.quantity;
//     });

//     res.status(201).json({
//       message: "Product item added successfully.",
//       totalStock,
//       newProduct // Optionally return the newly created product
//     });
//   } catch (error) {
//     console.error("Error adding product item:", error);
//     res.status(500).json({
//       message: "An error occurred while adding the product item.",
//       error: error.message // Return error message for debugging
//     });
//   }
// };


// exports.buyProduct = async (req, res) => {
//   const { productId, quantity } = req.body;

//   try {
//     // Find the product by ID
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Check if there is enough quantity available
//     if (product.quantity < quantity) {
//       return res.status(400).json({ message: 'Not enough quantity available' });
//     }

//     // Subtract the bought quantity from the total quantity
//     product.quantity -= quantity;
//     await product.save();

//     res.status(200).json({
//       message: 'Product bought successfully.',
//       remainingQuantity: product.quantity
//     });
//   } catch (error) {
//     console.error("Error buying product:", error);
//     res.status(500).json({
//       message: "An error occurred while buying the product."
//     });
//   }
// };

// exports.updateProductById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Fetch the updated product details from the request body
//     const { username, email, productName, price, categories, quantity } = req.body;

//     // Check if the product exists
//     let product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Update the product fields
//     product.username = username;
//     product.email = email;
//     product.productName = productName;
//     product.price = price;
//     product.categories = categories;
//     product.quantity = quantity;

//     // Save the updated product
//     await product.save();

//     res.status(200).json({ message: 'Product updated successfully', product });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     res.status(500).json({
//       message: "An error occurred while updating the product."
//     });
//   }
// };

// exports.getAllProducts = async (req, res) => {
//   try {
//     // Fetch all products from the database
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     console.error("Error fetching product details:", error);
//     res.status(500).json({
//       message: "An error occurred while fetching product details."
//     });
//   }
// };

// exports.getProductDetailById = async (req, res) => {
//   try {
//     const { _id } = req.body;

//     // Fetch product details from the database based on the id
//     const product = await Product.findById(_id);

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     res.json(product);
//   } catch (error) {
//     console.error("Error fetching product details:", error);
//     res.status(500).json({
//       message: "An error occurred while fetching product details."
//     });
//   }
// };

// exports.deleteProductById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Check if the product exists
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Delete the product
//     await Product.deleteOne({ _id: id });

//     res.json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     res.status(500).json({
//       message: "An error occurred while deleting product."
//     });
//   }
// };






const Product = require("../../model/pharmacy/addItem");

// Add product item
exports.addProductItem = async (req, res) => {
  const { name, email, productName, price, categories, quantity } = req.body;

  if (!name || !email || !productName || !price || !categories || !quantity) {
    return res.status(400).json({
      message: "Please provide all the details"
    });
  }

  try {
    // Check if product item exists
    const existingProduct = await Product.findOne({ productName });
    if (existingProduct) {
      return res.status(400).json({
        message: "Product with that name already exists."
      });
    }

    // Create a new product item
    await Product.create({
    //   username,
    name,
      email,
      productName,
      price,
      categories,
      quantity
    });
    res.status(201).json({
      message: "Product item added successfully."
    });
  } catch (error) {
    console.error("Error adding product item:", error);
    res.status(500).json({
      message: "An error occurred while adding the product item."
    });
  }
};

// Fetch product details
exports.getProductDetails = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({
      message: "An error occurred while fetching product details."
    });
  }
};

// Product detail by ID
exports.getProductDetailById = async (req, res) => {
  try {
    const { _id } = req.body; // Assuming the product ID is passed as a route parameter
    console.log(_id);
    // Fetch product details from the database based on the ID
    const product = await Product.findOne({ _id });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({
      message: "An error occurred while fetching product details."
    });
  }
};
