import { Router } from 'express';
import Authentication from '../Controllers/authentication.controllers';
import AuthValidationMiddleware from '../Middlewares/authentication.middleware';

const router = Router();
const {
	ValidateSignUp, ValidateSignIn, ValidateForgotPassword, ValidateResetPassword
} = AuthValidationMiddleware;

router.post('/signup', ValidateSignUp, Authentication.userSignUp);
router.post('/signin', ValidateSignIn, Authentication.userSignIn);
router.post('/forgotpassword', ValidateForgotPassword, Authentication.forgotPassword);
router.post('/resetpassword/:token', ValidateResetPassword, Authentication.resetPassword);

export default router;
