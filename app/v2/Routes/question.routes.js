import { Router } from 'express';
import QuestionController from '../Controllers/questions.controllers';
import QuestionMiddleware from '../Middlewares/question.middlewares';
import CommentController from '../Controllers/comments.controllers';
import CommentMiddleware from '../Middlewares/comment.middleware';
import Authorization from '../Middlewares/authorization.middleware';

const router = Router();

router.post('/meetup/:meetup_id', Authorization.isLoggedIn, QuestionMiddleware.createQuestion, QuestionController.createQuestion);
router.get('/', Authorization.isLoggedIn, QuestionController.getAllUserQuestion);
router.post('/:question_id/comment', Authorization.isLoggedIn, CommentMiddleware.createComment, CommentController.createComment);

export default router;
