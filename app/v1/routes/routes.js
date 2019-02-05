import express from 'express';
import meetupValidator from '../middleware/meetupValidator';
import userValidator from '../middleware/userValidator';
import questionValidator from '../middleware/questionValidator';
import paramsValidator from '../middleware/paramsValidator';
import CommentValidator from '../middleware/commentValidator';
import VerifyToken from '../middleware/auth';
import UserController from '../Controllers/UserController';
import MeetupController from '../Controllers/MeetupController';
import QuestionController from '../Controllers/QuestionController';
import RsvpController from '../Controllers/RsvpController';
import RsvpValidator from '../middleware/RsvpValidator';
import CommentController from '../Controllers/CommentController';

const router = express.Router();

const { signupValidator } = userValidator;
const { signup, signin } = UserController;
const { getParamsValidator } = paramsValidator;
const { createCommentValidator } = CommentValidator;
const { createComment } = CommentController;
const { isLogin } = VerifyToken;
const { createMeetupValidator } = meetupValidator;
const { createQuestionValidator } = questionValidator;
const { rsvpValidator } = RsvpValidator;
const { rsvpMeetup } = RsvpController;
const {
	createQuestion, getQuestion, downvoteQuestion, upvoteQuestion
} = QuestionController;
const {
	createMeetup, getAMeetup, getAllMeetups, getUpcomingMeetups, deleteMeetup
} = MeetupController;


router.route('/auth/signup')
	.post(signupValidator, signup);

router.route('/auth/signin')
	.post(signin);

router.route('/meetups')
	.get(isLogin, getAllMeetups)
	.post(isLogin, createMeetupValidator, createMeetup);

router.route('/meetups/upcoming')
	.get(isLogin, getUpcomingMeetups);

router.route('/meetups/:id')
	.get(isLogin, getParamsValidator, getAMeetup)
	.delete(isLogin, getParamsValidator, deleteMeetup);

router.route('/questions')
	.post(isLogin, createQuestionValidator, createQuestion);

router.route('/questions/:id')
	.get(isLogin, getParamsValidator, getQuestion);

router.route('/comments')
	.post(isLogin, createCommentValidator, createComment);

router.route('/meetups/:id/rsvps')
	.post(isLogin, getParamsValidator, rsvpValidator, rsvpMeetup);

router.route('/questions/:id/downvote')
	.patch(isLogin, getParamsValidator, downvoteQuestion);

router.route('/questions/:id/upvote')
	.patch(isLogin, getParamsValidator, upvoteQuestion);

export default router;
