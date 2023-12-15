const { isValidObjectId } = require('mongoose');
const { createChat, getAllChats, getChat } = require('../controllers/chat.controllers');
const express = require('express');
// const { authorizeAdmin , authenticate } = require("../middlewares/authenticateMiddleware")
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const chatValidation = require('../validation/chat.validation');
const { authorizeAdmin, authenticate } = require('../middlewares/authenticateMiddleware');
const router = express.Router();

router
	.route('/')
	// .post(validationMiddleware(chatValidation), authenticate, createChat)
	.get(authorizeAdmin, getAllChats);

router.get('/id',isValidObjectId, authorizeAdmin, getChat);

module.exports = router;
