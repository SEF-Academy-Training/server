const Joi = require('joi');
// const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ 

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
        password: Joi.string()
        // .pattern(passwordRegex)
        .required().messages({
            'any.required': 'Password is required.',
            'string.empty': 'Password must not be empty.',
            'string.pattern.base': 'Password must contain at least 8 characters, including one digit, one lowercase letter, one uppercase letter, and one special character.'
        }),
 
        // role: Joi.string().valid('Admin', 'User').required().messages({
        //     'any.required': 'Role is required.',
        //     'any.only': 'Invalid role. Allowed values are: Admin, User'
        // }),        
        company: Joi.string().required().messages({
            'any.required': 'company is required.',
            'string.empty': 'company must not be empty.',
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
        password: Joi.string()
        // .pattern(passwordRegex)
        .messages({   
            'string.empty': 'Password must not be empty.',
            'string.pattern.base': 'Password must contain at least 8 characters, including one digit, one lowercase letter, one uppercase letter, and one special character.'
        }),

        // role: Joi.string().valid('Admin', 'User').required().messages({
        //     'any.required': 'Role is required.',
        //     'any.only': 'Invalid role. Allowed values are: Admin, User'
        // }),         
        company: Joi.string().required().messages({
            'any.required': 'company is required.',
            'string.empty': 'company must not be empty.',
        }),   

    }),
    updateUserProfileSchema: Joi.object({
        userName: Joi.string().messages({ 
            'string.empty': 'User Name must not be empty.',
        }),    
        userEmail: Joi.string().email().messages({
            'string.email': 'Must enter a valid email address.', 
            'string.empty': 'User Email must not be empty.',
        }),
        password: Joi.string()
        // .pattern(passwordRegex)
        .messages({ 
            'string.empty': 'Password must not be empty.',
            'string.pattern.base': 'Password must contain at least 8 characters, including one digit, one lowercase letter, one uppercase letter, and one special character.'
        }),
 
        role: Joi.string().valid('Admin', 'User').messages({ 
            'any.only': 'Invalid role. Allowed values are: Admin, User'
        }), 
        company: Joi.string().messages({ 
            'string.empty': 'company must not be empty.',
        }),  

    })
}