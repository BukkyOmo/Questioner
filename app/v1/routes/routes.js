import express from 'express';
import meetupValidator from '../middleware/meetupValidator';
import userValidator from '../middleware/userValidator';
import questionValidator from '../middleware/questionValidator';
import paramsValidator from '../middleware/paramsValidator';
import Auth from '../middleware/auth';
import UserController from '../dbControllers/UserController';
import MeetupController from '../dbControllers/MeetupController';
import QuestionController from '../dbControllers/QuestionController';
import CommentController from '../dbControllers/CommentController';

const router = express.Router();

router.route('/auth/signup')
	.post(userValidator.signupValidator, UserController.signup);

router.route('/auth/signin')
	.post(UserController.signin);

router.route('/meetups')
	.get(MeetupController.getAllMeetups)
	.post(meetupValidator.createMeetupValidator, MeetupController.createMeetup);

router.route('/meetups/:id')
	.get(paramsValidator.getParamsValidator, MeetupController.getAMeetup);

router.route('/questions')
	.post(questionValidator.createQuestionValidator, QuestionController.createQuestion);

router.route('/questions/:id')
	.get(paramsValidator.getParamsValidator, QuestionController.getQuestion);

router.route('/questions/:id/comments')
	.post(Auth.isLogin, CommentController.createComment);

router.route('/questions/:id/downvote')
	.patch(paramsValidator.getParamsValidator, QuestionController.downvoteQuestion);

router.route('/questions/:id/upvote')
	.patch(paramsValidator.getParamsValidator, QuestionController.upvoteQuestion);

export default router;
