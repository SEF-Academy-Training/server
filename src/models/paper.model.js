const mongoose = require('mongoose');
const { enum_PaperDocs, enum_paperStatus, enum_PaperTypes } = require('../config/enums');
const { Schema } = mongoose;

const paperSchema = new Schema(
	{
		document: {
			type: String,
			enum: enum_PaperDocs,
			required: [true, 'please provide the document title'],
			trim: true,
		},

		status: {
			type: String,
			enum: enum_paperStatus,
		},

		type: {
			type: String,
			enum: enum_PaperTypes,
			required: [true, 'please provide the paper title'],
		},

		// actions: {
		// 	type: String,
		// 	enum: enum_paperStatus,
		// 	required: [true, 'please provide the paper title'],
		// },

		file: String,
		comment: String,

		service: { type: Schema.Types.ObjectId, ref: 'Service' },

		user: { type: mongoose.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
);

const Paper = mongoose.model('Paper', paperSchema);

module.exports = Paper;
