const Blog = require('../models/blog.model');
const asyncHandler = require('express-async-handler');
const { infoLogger } = require('../services/infoLoggerService');
const { paginate } = require('../utils/pagination');

const blogController = {
	getAllBlogs: asyncHandler(async (req, res) => {
		const { error, data, pagination } = await paginate(Blog, req);
		if (error) {
			return res.status(404).send({ success: false, error });
		}

		res.status(200).send({ success: true, data, pagination });
	}),

	getBlog: asyncHandler(async (req, res) => {
		const blog = await Blog.findOne({ _id: req.params.id });
		if (!blog) {
			return res.status(404).send({ success: false, error: 'Blog not found' });
		}

		res.status(200).send({ success: true, data: blog });
	}),

	createBlog: asyncHandler(async (req, res) => {
		if (req.file) {
			req.body.cover = `/blogs/${req.file.filename}`;
		}

		const newBlog = await Blog.create(req.body);

		if (!newBlog) {
			return res.status(400).send({
				success: false,
				message: 'Something went wrong while create Blog',
			});
		}

		res.status(201).send({
			success: true,
			data: newBlog,
			message: 'new Blog was created successfully',
		});
		infoLogger.info(
			`Blog ${newBlog?.title} | ${newBlog?._id} | new Blog was created successfully by user ${req.user?._id}`
		);
	}),

	updateBlog: asyncHandler(async (req, res) => {
		if (req.file) {
			req.body.cover = `/blogs/${req.file.filename}`;
		}
		const { id } = req.params;

		const updatedBlog = await Blog.findByIdAndUpdate({ _id: id }, req.body, {
			new: true,
		});

		if (!updatedBlog) {
			return res.status(404).send({ success: false, error: 'Blog not found' });
		}

		res.status(201).send({
			success: true,
			data: updatedBlog,
			message: 'Blog was updated successfully',
		});
		infoLogger.info(
			`Blog ${updatedBlog?.title} | ${updatedBlog?._id} | Blog was updated successfully by user ${req.user?._id}`
		);
	}),

	deleteBlog: asyncHandler(async (req, res) => {
		const { id } = req.params;

		const deletedBlog = await Blog.findByIdAndDelete({ _id: id });

		if (!deletedBlog) {
			return res.status(404).send({ success: false, error: 'Blog not found' });
		}

		res.status(201).send({
			success: true,
			message: 'Blog was deleted successfully',
		});
		infoLogger.info(
			`Blog ${deletedBlog?.title} | ${deletedBlog?._id} | Blog was deleted successfully by user ${req.user?._id}`
		);
	}),
};

module.exports = blogController;

// ------------------------------ auto Update Blog Status------------------------
// exports.autoUpdateBlogStatus = async (req, res) => {
// 	try {
// 		const currentDate = new Date();
// 		const draftBlogs = await Blog.find({ isPublished: false });

// 		if (!draftBlogs) return null;

// 		for (const Blog in draftBlogs) {
// 			if (Blog.publish_date >= currentDate) {
// 				await Blog.updateOne(
// 					{ _id: Blog?._id },
// 					{ $set: { isPublished: true } }
// 				);
// 				infoLogger.info(
// 					`Blog ${Blog?.title} | ${Blog?._id} | isPublished auto updated from  false 'draft' to true 'published'`
// 				);
// 			}
// 		}
// 	} catch (error) {
// 		error.message = 'something went wrong while auto update Blog isPublished';
// 		if (process.env.NODE_ENV == 'development') {
// 			console.log(error);
// 		}
// 		errorLogger.error(error);
// 	}
// };
