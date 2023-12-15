const Joi = require('joi');

const chatValidation = Joi.object({
    content: Joi.string().allow('').optional(), 
    sent_by: Joi.string().required(), 
});

module.exports = chatValidation;
