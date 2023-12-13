const Joi = require('joi');
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ 

module.exports = {
    createByAdminSchema: Joi.object({
        userName: Joi.string().required().messages({
            'any.required': 'User Name is required.',
            'string.empty': 'User Name must not be empty.',
        }),    
        userEmail: Joi.string().email().required().messages({
            'string.email': 'Must enter a valid email address.',
            'any.required': 'User Email is required.',
            'string.empty': 'User Email must not be empty.',
        }),
        password: Joi.string().pattern(passwordRegex).required().messages({
            'any.required': 'Password is required.',
            'string.empty': 'Password must not be empty.',
            'string.pattern.base': 'Password must contain at least 8 characters, including one digit, one lowercase letter, one uppercase letter, and one special character.'
        }),
        country: Joi.string().required().messages({
            'any.required': 'Country is required.',
            'string.empty': 'Country must not be empty.',
        }),   
        role: Joi.string().valid('Admin', 'User').required().messages({
            'any.required': 'Role is required.',
            'any.only': 'Invalid role. Allowed values are: Admin, User'
        }),
        mobileNumber: Joi.number().integer().required().messages({
            'any.required': 'Mobile number is required.',
            'number.base': 'Mobile number must be a valid integer.',
        }),
    }),
    updateByAdminSchema: Joi.object({
        userName: Joi.string().required().messages({ 
            'string.empty': 'User Name must not be empty.',
        }),    
        userEmail: Joi.string().email().required().messages({
            'string.email': 'Must enter a valid email address.',
            'any.required': 'User Email is required.',
            'string.empty': 'User Email must not be empty.',
        }),
        password: Joi.string().pattern(passwordRegex).required().messages({
            'any.required': 'Password is required.',
            'string.empty': 'Password must not be empty.',
            'string.pattern.base': 'Password must contain at least 8 characters, including one digit, one lowercase letter, one uppercase letter, and one special character.'
        }),
        country: Joi.string().required().messages({
            'any.required': 'Country is required.',
            'string.empty': 'Country must not be empty.',
        }),   
        role: Joi.string().valid('Admin', 'User').required().messages({
            'any.required': 'Role is required.',
            'any.only': 'Invalid role. Allowed values are: Admin, User'
        }), 
        mobileNumber: Joi.number().integer().required().messages({
            'any.required': 'Mobile number is required.',
            'number.base': 'Mobile number must be a valid integer.',
        }),
    }),
    updateUserProfileSchema: Joi.object({
        userName: Joi.string().required().messages({ 
            'string.empty': 'User Name must not be empty.',
        }),    
        userEmail: Joi.string().email().required().messages({
            'string.email': 'Must enter a valid email address.',
            'any.required': 'User Email is required.',
            'string.empty': 'User Email must not be empty.',
        }),
        password: Joi.string().pattern(passwordRegex).required().messages({
            'any.required': 'Password is required.',
            'string.empty': 'Password must not be empty.',
            'string.pattern.base': 'Password must contain at least 8 characters, including one digit, one lowercase letter, one uppercase letter, and one special character.'
        }),
        country: Joi.string().required().messages({
            'any.required': 'Country is required.',
            'string.empty': 'Country must not be empty.',
        }),   
        role: Joi.string().valid('Admin', 'User').required().messages({
            'any.required': 'Role is required.',
            'any.only': 'Invalid role. Allowed values are: Admin, User'
        }), 
        mobileNumber: Joi.number().integer().required().messages({
            'any.required': 'Mobile number is required.',
            'number.base': 'Mobile number must be a valid integer.',
        }),
    })
}