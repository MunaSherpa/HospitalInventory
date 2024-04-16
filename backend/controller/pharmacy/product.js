const ProductSchema = require("../../model/pharmacy/product");
const Product = require("../../model/pharmacy/product");

const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('image');




// exports.createProduct = async (req, res) => {
//   try {
//     // Set a default image path for testing
//     const image = "1708799547368-doctor.png";

//     // Extract other product details from the request body
//     const { name, description, price,  categories, stock} = req.body;

//     // Validate other product details here

//     // Create the product in the database
//     // Replace this with your actual product creation logic
//     await ProductSchema.create({
//       image,
//       name,
//       description,
//       price,
//       categories,
//       stock
//     });

//     res.status(201).json({ message: "Product created successfully." });
//   } catch (error) {
//     console.error("Error creating product:", error);
//     res.status(500).json({ message: "An error occurred while creating the product." });
//   }
// };





//Product create
exports.createProduct = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({
        message: "An error occurred while uploading the image."
      });
    } else if (err) {
      return res.status(500).json({
        message: "An unknown error occurred."
      });
    }

    const { name, description, price, categories,stock } = req.body;
    const image = req.file.path;

    if (!image || !name || !description || !price || !categories || !stock) {
      return res.status(400).json({
        message: "Please provide all the details"
      });
    }

    try {
      // Create a new product
      await Product.create({
        image,
        name,
        description,
        price,
        categories,
        stock
      });
      res.status(201).json({
        message: "Product created successfully."
      });
    } catch (error) {
      console.error("Error created product:", error);
      res.status(500).json({
        message: "An error occurred while created the product."
      });
    }
  });
};

// Fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await ProductSchema.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({
      message: "An error occurred while fetching product details."
    });
  }
};

// Fetch product details by ID
exports.getProductDetailById = async (req, res) => {
  try {
    const { _id} = req.body;

    console.log(_id);

    // Fetch product details from the database based on the id
    const product = await ProductSchema.findById(_id);

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





// Delete product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the blog post exists
    const product = await ProductSchema.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'product  not found' });
    }

    // Delete the blog post
    await ProductSchema.deleteOne({ _id: id });

    res.json({ message: 'Product post deleted successfully' });
  } catch (error) {
    console.error("Error deleting product :", error);
    res.status(500).json({
      message: "An error occurred while deleting product."
    });
  }
};





exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the updated product details from the request body
    const { name, description, price, categories, stock } = req.body;

    // Check if the product exists
    let product = await ProductSchema.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product fields
    product.name = name;
    product.description = description;
    product.price = price;
    product.categories = categories;
    product.stock = stock;

    // Save the updated product
    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "An error occurred while updating the product."
    });
  }
};

// Update product by ID
// exports.updateProductById = async (req, res) => {
//   try {
//     const { _id } = req.params;

//     // Extract updated product details from the request body
//     const { name, description, price, categories, stock } = req.body;

//     // Find the product by ID and update it
//     const updatedProduct = await ProductSchema.findByIdAndUpdate(_id, {
//       name,
//       description,
//       price,
//       categories,
//       stock
//     }, { new: true }); // Set { new: true } to return the updated product

//     if (!updatedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     res.status(500).json({
//       message: "An error occurred while updating the product."
//     });
//   }
// };
