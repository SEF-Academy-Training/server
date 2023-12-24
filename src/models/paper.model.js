const mongoose = require('mongoose');
const { enum_PaperDocs, enum_paperStatus, enum_PaperTypes } = require('../config/enums');
const { deleteUploadedFile } = require('../utils/deleteUploadedFile');
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
			required: true,
			default: enum_paperStatus[0],
		},

		type: {
			type: String,
			enum: enum_PaperTypes,
			required: [true, 'please provide the paper title'],
		},

		file: String,

		comment: String,

		hash: {
			type: String,
			required: [true, 'please provide the paper hash'],
			unique: [true, 'hash is unique, this paper already uploaded'],
		},

		// service: { type: Schema.Types.ObjectId, ref: 'Service' },

		user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
	},
	{ timestamps: true }
);

paperSchema.pre('findOneAndUpdate', deleteUploadedFile);
paperSchema.pre('findOneAndDelete', deleteUploadedFile);

const Paper = mongoose.model('Paper', paperSchema);

module.exports = Paper;
