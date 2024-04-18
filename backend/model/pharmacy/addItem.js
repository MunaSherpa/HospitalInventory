const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddItemsSchema = new Schema({
    name : {
        type : String,
        required : [true, "Name must be provided"]
    },
    email : {
        type : String,
        required : [true, 'Email must be provided'],
        unique: true  // email aunu paro vanako true
        
    },
//   product: {
//     type: Schema.Types.ObjectId,
//     ref: 'Product', // Reference the Product model
//     required: true,
//   },
productName:{
    type : String,
        required : [true, "Name must be provided"]
},
// price:{
//     type: Number,
//     required: true,
// },
// categories: {
//     type: String,
//     required: true,
//   },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  }
//   user: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: "User"
//   }
});

module.exports = mongoose.model('AddItem', AddItemsSchema);