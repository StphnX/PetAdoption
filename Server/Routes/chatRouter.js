import express from 'express';
import {
  createChat,
  getChatMessages,
  createMessage,
} from '../Controllers/chatControllers.js';

const router = express.Router();

router.post('/chats', createChat);
router.get('/chats/:chatId/messages', getChatMessages);
router.post('/chats/:chatId/messages', createMessage);

export default router;