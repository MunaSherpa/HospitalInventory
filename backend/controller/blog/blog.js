const Blog = require("../../model/blog/blog")


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

// create
exports.createBlog = async (req, res) => {
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

    const { title, description, createdDate} = req.body;
    image = req.file.path;
    // image = "/image";

    console.log(req.body)
  // console.log(image);

    if (!image ||! title || !description || !createdDate) {
      
      return res.status(400).json({
        message: "Please provide all the details"
      });
    }

    try {
        await Blog.create({
          image,
          title,
          description,
          createdDate
        });
  
        res.status(201).json({
          message: "Blog post created successfully."
        });
      } catch (error) {
        console.error("Error creating blog post:", error);
        res.status(500).json({
          message: "An error occurred while creating the blog post."
        });
      }
    });
  };





// Fetch all blog posts
exports.getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({
        message: "An error occurred while fetching blog posts."
      });
    }
  };


// Fetch blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({
      message: "An error occurred while fetching blog post."
    });
  }
};



// Update blog post by ID
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the updated blog post details from the request body
    const { title, description, createdDate } = req.body;

    // Check if the blog post exists
    let blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Check if the request contains an image for update
    let image;
    if (req.file) {
      image = req.file.path;
    }

    // Update the blog post fields
    if (image) blog.image = image;
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (createdDate) blog.createdDate = createdDate;

    // Save the updated blog post
    await blog.save();

    res.json({ message: 'Blog post updated successfully', blog });
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({
      message: "An error occurred while updating blog post."
    });
  }
};










// Delete blog post by ID
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the blog post exists
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Delete the blog post
    await Blog.deleteOne({ _id: id });

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({
      message: "An error occurred while deleting blog post."
    });
  }
};


