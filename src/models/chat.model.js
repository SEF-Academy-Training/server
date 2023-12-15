const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema(
	{

		content: {
			type: String,
		},

		sent_by: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;