// controllers/messageController.js
const Message = require('../../model/chat/Message');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 'asc' });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMessage = async (req, res) => {
  const message = new Message({
    text: req.body.text,
    sender: req.body.sender,
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
