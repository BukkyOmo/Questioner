import { Router } from 'express';
import QuestionController from '../Controllers/questions.controllers';
import QuestionMiddleware from '../Middlewares/question.middlewares';
import Authorization from '../Middlewares/authorization.middleware';

const router = Router();

router.post('/meetup/:meetup_id', Authorization.isLoggedIn, QuestionMiddleware.createQuestion, QuestionController.createQuestion);

export default router;
