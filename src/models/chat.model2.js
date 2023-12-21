const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	text: {
		type: String,
		// required: true,
	},
	file: {
		type: Object,
		// required: true,
	},
	type: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	sent_by: {
		type: String,
	},
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
