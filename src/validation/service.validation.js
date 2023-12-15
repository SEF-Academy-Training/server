const Joi = require('joi');
const { enum_ServiceCategory, enum_ServiceStatus } = require('../config/enums');

const newServiceValidation = Joi.object({
	title: Joi.string()
		.valid(...enum_ServiceCategory)
		.required()
		.messages({
			'any.required': 'Please enter a Service title',
			'any.only': `Must be one of the following values: ${enum_ServiceCategory}`,
		}),

	status: Joi.string()
		.valid(...enum_ServiceStatus)
		.required()
		.default(enum_ServiceStatus[0])
		.messages({
			'any.required': 'Please enter a Service title',
			'any.only': `Must be one of the following values: ${enum_ServiceStatus}`,
		}),

	code: Joi.string(),
	comments: Joi.string(),
	papers: Joi.array().items(Joi.string()),
	created_by: Joi.string(),
});

const updateServiceValidation = Joi.object({
	title: Joi.string()
		.valid(...enum_ServiceCategory)
		.messages({
			'any.only': `Must be one of the following values: ${enum_ServiceCategory}`,
		}),

	status: Joi.string()
		.valid(...enum_ServiceStatus)
		.default(enum_ServiceStatus[0])
		.messages({
			'any.only': `Must be one of the following values: ${enum_ServiceStatus}`,
		}),

	code: Joi.string(),
	comments: Joi.string(),
	papers: Joi.array().items(Joi.string()),
	created_by: Joi.string(),
});

module.exports = { newServiceValidation, updateServiceValidation };
