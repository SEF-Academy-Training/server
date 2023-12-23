const mongoose = require('mongoose');
const { Schema } = mongoose;
const { enum_PaperTypes } = require('../config/enums');
const { deleteUploadedFile } = require('../utils/deleteUploadedFile');

const ourServiceSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'please provide the ourService title'],
			trim: true,
		},

		// code: {
		// 	type: String,
		// 	required: [true, 'please provide the ourService code'],
		// },
		titleAr: String,
		cover: String,

		type: {
			type: String,
			enum: enum_PaperTypes,
			required: [true, 'please provide the ourService type'],
		},

		requiredPapers: {
			type: [String],
			required: true,
		},

		description: String,
	},
	{ timestamps: true }
);

// ourServiceSchema.pre('findOneAndUpdate', deleteUploadedFile);
ourServiceSchema.pre('findOneAndDelete', deleteUploadedFile);

// function deleteUploadedFile(next) {
// 	if (!this.file || this.constructor.name !== 'Blog') return next();
// 	deleteUploadedFile();
// }

const OurService = mongoose.model('ourService', ourServiceSchema);

module.exports = OurService;
