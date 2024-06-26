// const mongoose = require("mongoose");

// const chatModel = mongoose.Schema(
//   {
//     chatName: { type: String, trim: true },
//     isGroupChat: { type: Boolean, default: false },
//     users: [{ 
//         type: mongoose.Schema.Types.ObjectId,
//          ref: "User" 
//         }],
//     latestMessage: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Message",
//     },
//     groupAdmin: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: "User" 
//     },
//   },
//   { timestamps: true }
// );

// const Chat = mongoose.model("Chat", chatModel);

// module.exports = Chat;





const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  messages: [{
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
});

module.exports = mongoose.model("Chat", ChatSchema);
