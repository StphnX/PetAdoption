import Chat from '../schemas/chatSchema.js';
import Message from '../schemas/messageSchema.js';

export const createChat = async (req, res) => {
  try {
    const { participants } = req.body;

    const existingChat = await Chat.findOne({ participants: { $all: participants } });

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    const newChat = await Chat.create({ participants });
    return res.status(201).json(newChat);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create chat' });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).populate('messages');
    return res.status(200).json(chat.messages);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve chat messages' });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { text, sender, recipient } = req.body;
    const { chatId } = req.params;

    const message = await Message.create({ text, sender, recipient });
    
    // Add the message to the chat's messages array
    await Chat.findByIdAndUpdate(chatId, { $push: { messages: message._id } });

    return res.status(201).json(message);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create message' });
  }
};