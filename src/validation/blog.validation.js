const Joi = require('joi');
const { enum_BlogsCategory } = require('../config/enums');

const newBlogValidation = Joi.object({
	title: Joi.string().required().min(3).max(150).messages({
		'any.required': 'Please enter a Blog name',
		'any.min': 'Blog name must be between 3 and 150 characters',
		'any.max': 'Blog name must be between 3 and 150 characters',
	}),

	categories:
		// Joi.array().items(
		Joi.string()
			// .valid(...enum_BlogsCategory)
			.trim()
			.required()
			.messages({
				'any.required': 'Please provide a status for this Blog',
				// 'any.only': `Must be one of the following values: ${enum_BlogsCategory}`,
			}),
	// ),
	tags: Joi.array().items(Joi.string().trim().required()).messages({
		'any.required': 'Please provide a status for this Blog',
	}),

	content: Joi.string().required().messages({
		'any.required': 'Please provide a content for this Blog',
	}),

	cover: Joi.string(),
});

const updateBlogValidation = Joi.object({
	title: Joi.string().min(3).max(150).messages({
		'any.min': 'Blog name must be between 3 and 150 characters',
		'any.max': 'Blog name must be between 3 and 150 characters',
	}),

	categories: 
	// Joi.array().items(
		Joi.string()
		.trim()
		// .valid(...enum_BlogsCategory)
			// .messages({
			// 	'any.only': `Must be one of the following values: ${enum_BlogsCategory}`,
			// })
			,
	// ),

	tags: Joi.array().items(Joi.string().trim()),

	content: Joi.string(),

	cover: Joi.string(),
});

module.exports = { newBlogValidation, updateBlogValidation };
