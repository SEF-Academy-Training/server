const Chat = require('../models/chat.model2');
// const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');


// Controller for sending a text message
const chatController = {
	sendMessage: asyncHandler(async (req, res) => {
		const newMessage = await Chat.create({ ...req.body, type: 'text' });
		if (!newMessage) {
			return res.status(400).send({
				success: false,
				data: null,
				message: 'Something went wrong while sending message',
			});
		}
		res.status(201).send({ success: true, data: newMessage });
	}),

	// Controller for sending a file
	sendfile: asyncHandler(async (req, res) => {
		if (!req.file) {
			return res.status(400).json({ error: 'No file uploaded.' });
		}

		console.log('req.file 26', req.file);

		req.body.file = `/chats/${req.file.filename}`;

		const createdMessage = {
			...req.body,
			type: 'file',
			file: {
				url: req.body.file,
				name: req.file.originalname,
				size: req.file?.size,
			},
		};

		const newMessage = await Chat.create(createdMessage);

		if (!newMessage) {
			return res.status(400).send({
				success: false,
				data: newMessage,
				message: 'Something went wrong while sending message',
			});
		}

		res.status(201).send({ success: true, data: newMessage });
	}),

	// Controller to get user's all messages
	getUserMessages: asyncHandler(async (req, res) => {
		const userId = req.params.id;
		console.log('userId', userId);

		const userMessages = await Chat.find({ user: userId }).sort({ date: 1 });

		if (!userMessages) {
			return res.status(400).send({ success: false, message: 'Messages not found' });
		}
		res.status(200).send({ success: true, data: userMessages });
	}),

	// Controller to get senders
	getUsersWithMessages: asyncHandler(async (req, res) => {
		const usersWithMessages = await Chat.distinct('user').sort({ date: 1 }).populate('User');

		// const userIDs = await Chat.find().distinct('user').sort({ date: 1 });

		// const usersWithMessages = await User.find({ _id: { $in: userIDs } });

		// if (!usersWithMessages) {
		// 	return res.status(400).send({ success: false, message: 'Messages not found' });
		// }
		res.status(200).send({ success: true, data: usersWithMessages });
	}),

	getUserMyMessages: asyncHandler(async (req, res) => {
		const userId = req.params.id;
		console.log('userId', userId);
		const userMessages = await Chat.find({
			user: '657ca903ac78bddc5a04edf4',
		}).sort({ date: 1 });

		if (!userMessages) {
			return res.status(400).send({ success: false, message: 'Messages not found' });
		}
		res.status(200).send({ success: true, data: userMessages });
	}),
};
module.exports = chatController;
