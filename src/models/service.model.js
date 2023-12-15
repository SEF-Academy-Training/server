const mongoose = require('mongoose');
const { Schema } = mongoose;
const { enum_ServiceCategory, enum_ServiceStatus } = require('../config/enums');

const serviceSchema = new Schema(
	{
		title: {
			type: String,
			enum: enum_ServiceCategory,
			required: [true, 'please provide the service title'],
			trim: true,
		},

		code: {
			type: String,
			required: [true, 'please provide the service code'],
			// unique: [true, 'Service code is already exist please provide another one'],
		},

		status: {
			type: String,
			enum: enum_ServiceStatus,
			required: [true, 'please provide the service title'],
		},

		papers: [{ type: Schema.Types.ObjectId, ref: 'Paper' }],

		comments: String,

		created_by: { type: mongoose.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
