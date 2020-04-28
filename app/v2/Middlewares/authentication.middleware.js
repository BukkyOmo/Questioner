import Joi from 'joi';

const signUpSchema = Joi.object().keys({
    firstname: Joi.string().min(3).max(20).required(),
    lastname: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).max(25).required()
})

class AuthValidationMiddleware {
    static async ValidateSignUp(req, res, next) {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: 'Please fill all fields',
                statusCode: 400,
                status: 'Failure'
            });
        }
        try {
            await Joi.validate(req.body, signUpSchema);
            return next();
        } catch (error) {    
            return res.status(400).json({
                message: error.details[0].message.replace(/"/g, ""),
                statusCode: 400,
                status: 'Failure'
            });
        } 
    }
}

export default AuthValidationMiddleware;
