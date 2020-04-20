const Joi = require('@hapi/joi');

const signUp = Joi.object().keys({
    firstname: Joi.string().min(3).max(20).required(),
    lastname: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.alphanum().min(8).max(25).required(),
    confirm_password: Joi.ref('password').required()
});

// class AuthValidationMiddleware{
//     static async ValidateSignUp(req, res, next) {
//         if (Object.keys(req.body).length === 0) {
//             res.status(400).json({
//                 message: 'Please fill all fields',
//                 status: 'Failure'
//             })
//         } else {
            
//         }
//     }
// }

// Joi.validate()