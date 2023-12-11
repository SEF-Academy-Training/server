const Joi = require('joi');
const { enum_BlogsCategory } = require('../config/enums');

const newBlogValidation = Joi.object({
	title: Joi.string().required().min(3).max(100).messages({
		'any.required': 'Please enter a Blog name',
		'any.min': 'Blog name must be between 3 and 100 characters',
		'any.max': 'Blog name must be between 3 and 100 characters',
	}),

	category: Joi.string()
		.valid(...enum_BlogsCategory)
		.required()
		.trim()
		.messages({
			'any.required': 'Please provide a status for this Blog',
			'any.only': `Must be one of the following values: ${enum_BlogsCategory}`,
		}),

	content: Joi.string().required().messages({
		'any.required': 'Please provide a content for this Blog',
	}),

	cover: Joi.string(),

	publish_date: Joi.date().default(Date.now()),

	// publish_by: Joi.string()
	// 	.required()
	// 	.messages({ 'any.required': 'Please select the Instructor' }),

	isPublished: Joi.boolean().required().messages({
		'any.required': 'Please specify if you want to publish or draft',
	}),
});

const updateBlogValidation = Joi.object({
	title: Joi.string().min(3).max(100).messages({
		'any.min': 'Blog name must be between 3 and 100 characters',
		'any.max': 'Blog name must be between 3 and 100 characters',
	}),

	category: Joi.string()
		.valid(...enum_BlogsCategory)
		.trim()
		.messages({
			'any.required': 'Please provide a category for this Blog',
			'any.only': `Must be one of the following values: ${enum_BlogsCategory}`,
		}),

	content: Joi.string(),

	cover: Joi.string(),

	publish_date: Joi.date().default(Date.now()),

	// publish_by: Joi.string(),

	isPublished: Joi.boolean(),
});

module.exports = { newBlogValidation, updateBlogValidation };
