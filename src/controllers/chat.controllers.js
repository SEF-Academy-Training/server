const Chat = require('../models/chat.model');
const asyncHandler = require('express-async-handler');
const { infoLogger } = require('../services/infoLoggerService');
const { paginate } = require('../utils/pagination');
const { find } = require('../models/chat.model');

const chatController = {
	getAllChats: asyncHandler(async (req, res) => {
		const { error, data} = await Chat.find();
		if (error) {
			return res.status(404).send({ success: false, error });
		}

		res.status(200).send({ success: true, data});
	}),

	getChat: asyncHandler(async (req, res) => {
		const chat = await Chat.findOne({ _id: req.params.id });
		if (!chat) {
			return res.status(404).send({ success: false, error: 'Chat not found' });
		}

		res.status(200).send({ success: true, data: chat });
	}),

	createChat: asyncHandler(async (req, res) => {
		const newChat = await Chat.create(req.body);

		if (!newChat) {
			return res.status(400).send({
				success: false,
				message: 'Something went wrong while create Chat',
			});
		}

		res.status(201).send({

			message: 'Your message have been sent to us we will response to you when some admin is avilable thank you',
		});
		infoLogger.info(
			`Chat ${newChat?.title} | ${newChat?._id} | new Chat was created successfully by user ${req.user?._id}`
		);
	}),


	

};

module.exports = chatController;