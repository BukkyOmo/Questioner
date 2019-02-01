import express from 'express';
import meetupValidator from '../middleware/meetupValidator';
import userValidator from '../middleware/userValidator';
import questionValidator from '../middleware/questionValidator';
import paramsValidator from '../middleware/paramsValidator';
import CommentValidator from '../middleware/commentValidator';
import Auth from '../middleware/auth';
import UserController from '../dbControllers/UserController';
import MeetupController from '../dbControllers/MeetupController';
import QuestionController from '../dbControllers/QuestionController';
import CommentController from '../dbControllers/CommentController';

const router = express.Router();

const { getParamsValidator } = paramsValidator;
const { createCommentValidator } = CommentValidator;
const { createComment } = CommentController;
const { isLogin } = Auth;
const { getAMeetup } = MeetupController;


router.route('/auth/signup')
	.post(userValidator.signupValidator, UserController.signup);

router.route('/auth/signin')
	.post(UserController.signin);

router.route('/meetups')
	.get(MeetupController.getAllMeetups)
	.post(meetupValidator.createMeetupValidator, MeetupController.createMeetup);

router.route('/meetups/:id')
	.get(getParamsValidator, getAMeetup);

router.route('/questions')
	.post(questionValidator.createQuestionValidator, QuestionController.createQuestion);

router.route('/questions/:id')
	.get(getParamsValidator, QuestionController.getQuestion);

router.route('/questions/:id/comments')
	.post(isLogin, getParamsValidator, createCommentValidator, createComment);

router.route('/questions/:id/downvote')
	.patch(getParamsValidator, QuestionController.downvoteQuestion);

router.route('/questions/:id/upvote')
	.patch(getParamsValidator, QuestionController.upvoteQuestion);

export default router;
