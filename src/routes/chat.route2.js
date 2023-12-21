const express = require('express');
const router = express.Router();
const { authorizeAdmin, authenticate } = require('../middlewares/authenticateMiddleware');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { uploadFile } = require('../middlewares/uploadMiddleware');
const chatValidation = require('../validation/chat.validation2');
const chatController = require('../controllers/chat.controllers2');
const validateObjectId = require('../middlewares/validateObjectIdMiddleware');

// get user message list -------- for user
router.get('/my-messages', authenticate, chatController.getUserMyMessages);

// get sender list --------- for admin
router.get('/', authorizeAdmin, chatController.getUsersWithMessages);

// get one user's all messages --------- for admin
router.get('/:id', authorizeAdmin, validateObjectId, chatController.getUserMessages);

// send a new text message ------- for user and admin
router.post(
	'/send-message',
	authenticate,
	validationMiddleware(chatValidation),
	chatController.sendMessage
);

// send a new file message ------- for user and admin
router.post(
	'/send-file',
	uploadFile.single('file'),
	authenticate,
	validationMiddleware(chatValidation),
	chatController.sendfile
);

module.exports = router;
