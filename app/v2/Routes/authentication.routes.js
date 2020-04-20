import { Router } from 'express';
import Authentication from '../Controllers/authentication.controllers';

const router = Router();

router.post('/signup', Authentication.userSignUp);

export default router;
