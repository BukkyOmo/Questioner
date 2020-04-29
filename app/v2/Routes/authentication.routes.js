import { Router } from 'express';
import Authentication from '../Controllers/authentication.controllers';
import AuthValidationMiddleware from '../Middlewares/authentication.middleware';

const router = Router();
const { ValidateSignUp } = AuthValidationMiddleware;

router.post('/signup', ValidateSignUp, Authentication.userSignUp);

export default router;
