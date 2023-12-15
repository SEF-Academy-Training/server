const Joi = require('joi');
const { enum_PaperDocs, enum_PaperTypes, enum_paperStatus } = require('../config/enums');

const newPaperValidation = Joi.object({
	document: Joi.string()
		.valid(...enum_PaperDocs)
		.trim()
		.required()
		.messages({
			'any.required': 'Please provide a document title',
			'any.only': `Must be one of the following values: ${enum_PaperDocs}`,
		}),
	status: Joi.string()
		.valid(...enum_paperStatus)
		.trim()
		.messages({
			'any.only': `Must be one of the following values: ${enum_paperStatus}`,
		}),
	type: Joi.string()
		.valid(...enum_PaperTypes)
		.trim()
		.required()
		.messages({
			'any.required': 'Please provide a status for this Paper',
			'any.only': `Must be one of the following values: ${enum_PaperTypes}`,
		}),

	file: Joi.string(),

	comment: Joi.string().required().messages({
		'any.required': 'Please provide a comment for this Paper',
	}),
	service: Joi.string().required().messages({
		'any.required': 'Please provide a service id for this Paper',
	}),
	user: Joi.string().required().messages({
		'any.required': 'Please provide a user id for this Paper',
	}),
});

const updatePaperValidation = Joi.object({
	document: Joi.string()
		.valid(...enum_PaperDocs)
		.trim()
		.messages({
			'any.only': `Must be one of the following values: ${enum_PaperDocs}`,
		}),
	status: Joi.string()
		.valid(...enum_paperStatus)
		.trim()
		.messages({
			'any.only': `Must be one of the following values: ${enum_paperStatus}`,
		}),
	type: Joi.string()
		.valid(...enum_PaperTypes)
		.trim()
		.messages({
			'any.only': `Must be one of the following values: ${enum_PaperTypes}`,
		}),

	file: Joi.string(),

	comment: Joi.string(),
	service: Joi.string(),
	user: Joi.string(),
});

module.exports = { newPaperValidation, updatePaperValidation };
