const mongoose = require('mongoose');
const { Schema } = mongoose;
const { enum_BlogsCategory } = require('../config/enums');
const { deleteUploadedFile } = require('../utils/deleteUploadedFile');

const blogSchema = new Schema({
	title: {
		type: String,
		required: [true, 'please provide the blog category'],
		trim: true,
	},
	// category: {
	// 	type: String,
	// 	enum: enum_BlogsCategory,
	// 	required: [true, 'please provide the blog category'],
	// 	trim: true,
	// },
	content: {
		type: String,
		required: [true, 'please provide the blog content'],
	},

	categories: {
		type: [String],
		enum: enum_BlogsCategory,
		required: [true, 'please provide the blog categories'],
		trim: true,
	},
	tags: {
		type: [String],
		required: [true, 'please provide the blog tags'],
		trim: true,
	},
	cover: String, // image
	// publish_date: Date,
	// publish_by: {
	// 	type: mongoose.Types.ObjectId,
	// 	required: true,
	// 	ref: 'User',
	// },
	// isPublished: {
	// 	type: Boolean,
	// 	default: false,
	// },
});

blogSchema.pre('findOneAndUpdate', deleteUploadedFile);
blogSchema.pre('findOneAndDelete', deleteUploadedFile);

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
