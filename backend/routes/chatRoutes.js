const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/create', chatController.createChat);
router.get('/my-chats/:userId', chatController.getUserChats);
router.post('/send', chatController.sendMessage);
router.get('/messages/:chatId', chatController.getChatMessages);

module.exports = router;
