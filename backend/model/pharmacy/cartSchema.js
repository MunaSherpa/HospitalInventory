const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Reference the Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

module.exports = mongoose.model('Cart', CartSchema);
