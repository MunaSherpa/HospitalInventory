const mongoose = require('mongoose');


const BlogSchema = mongoose.Schema({
    image: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    
    
    createdDate: {
        type: Date
    }
});


const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;
