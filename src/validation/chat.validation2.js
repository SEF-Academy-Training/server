const Joi = require('joi');

const chatValidation = Joi.object({
	user: Joi.string().required(),
	text: Joi.string().optional(),
	file: Joi.object().optional(),
	type: Joi.string().required(),
	date: Joi.date().required(),
	sent_by: Joi.string().required(),
});

module.exports = chatValidation;
