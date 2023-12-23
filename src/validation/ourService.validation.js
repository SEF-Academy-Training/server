const Joi = require('joi');
const { enum_PaperTypes } = require('../config/enums');

const newOurServiceValidation = Joi.object({
	title: Joi.string().required().messages({
		'any.required': 'Please enter a Service title',
	}),

	// code: Joi.string(),

	type: Joi.string()
		.valid(...enum_PaperTypes)
		.required()
		.messages({
			'any.required': 'Please enter a Service status',
			'any.only': `Must be one of the following values: ${enum_PaperTypes}`,
		}),

	description: Joi.string(),
	cover: Joi.string(),
	titleAr: Joi.string(),

	requiredPapers: Joi.array().items(Joi.string()).required().messages({
		'any.required': 'Please select a Service required Papers',
	}),
});

const updateOurServiceValidation = Joi.object({
	title: Joi.string(),

	// code: Joi.string(),

	type: Joi.string()
		.valid(...enum_PaperTypes)
		.messages({
			'any.only': `Must be one of the following values: ${enum_PaperTypes}`,
		}),

	description: Joi.string(),
	cover: Joi.string(),
	titleAr: Joi.string(),

	requiredPapers: Joi.array().items(Joi.string()),
});

module.exports = { newOurServiceValidation, updateOurServiceValidation };
