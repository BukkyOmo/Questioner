import express from 'express';
import meetupValidator from '../middleware/meetupValidator';
import userValidator from '../middleware/userValidator';
import questionValidator from '../middleware/questionValidator';
import paramsValidator from '../middleware/paramsValidator';
import CommentValidator from '../middleware/commentValidator';
import VerifyToken from '../middleware/auth';
import UserController from '../dbControllers/UserController';
import MeetupController from '../dbControllers/MeetupController';
import QuestionController from '../dbControllers/QuestionController';
import RsvpController from '../dbControllers/RsvpController';
import RsvpValidator from '../middleware/RsvpValidator';
import CommentController from '../dbControllers/CommentController';

const router = express.Router();

const { signupValidator } = userValidator;
const { signup, signin } = UserController;
const { getParamsValidator } = paramsValidator;
const { createCommentValidator } = CommentValidator;
const { createComment } = CommentController;
const { isLogin } = VerifyToken;
const { createMeetup, getAMeetup, getAllMeetups } = MeetupController;
const { createMeetupValidator } = meetupValidator;
const { createQuestionValidator } = questionValidator;
const { createQuestion, getQuestion } = QuestionController;


router.route('/auth/signup')
	.post(signupValidator, signup);

router.route('/auth/signin')
	.post(signin);

router.route('/meetups')
	.get(isLogin, getAllMeetups)
	.post(isLogin, createMeetupValidator, createMeetup)
	.get(MeetupController.getUpcomingMeetups);

router.route('/meetups/:id')
	.get(isLogin, getParamsValidator, getAMeetup)
	.delete(paramsValidator.getParamsValidator, MeetupController.deleteMeetup);

router.route('/questions')
	.post(isLogin, createQuestionValidator, createQuestion);

router.route('/questions/:id')
	.get(isLogin, getParamsValidator, getQuestion);

router.route('/questions/:id/comments')
	.post(isLogin, getParamsValidator, createCommentValidator, createComment);

router.route('/questions/:id/downvote')
	.patch(getParamsValidator, QuestionController.downvoteQuestion);

router.route('/meetups/:id/rsvp')
	.post(paramsValidator.getParamsValidator, RsvpValidator.rsvpValidator, RsvpController.rsvpMeetup);

router.route('/questions/:id/upvote')
	.patch(getParamsValidator, QuestionController.upvoteQuestion);

export default router;
