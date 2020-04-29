import { Router } from 'express';
import Authentication from '../Controllers/authentication.controllers';
import AuthValidationMiddleware from '../Middlewares/authentication.middleware';

const router = Router();
const { ValidateSignUp, ValidateSignIn } = AuthValidationMiddleware;

router.post('/signup', ValidateSignUp, Authentication.userSignUp);
router.post('/signin', ValidateSignIn, Authentication.userSignIn);

export default router;
