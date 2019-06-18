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
import imageUpload from '../../../config/cloudinay';

const router = express.Router();

const { signupValidator } = userValidator;
const { signinValidator } = userValidator;
const { signup, signin } = UserController;
const { getParamsValidator } = paramsValidator;
const { createCommentValidator } = CommentValidator;
const { createComment, getComment } = CommentController;
const { isLogin } = VerifyToken;
const { createMeetupValidator } = meetupValidator;
const { createQuestionValidator } = questionValidator;
const { rsvpValidator } = RsvpValidator;
const { rsvpMeetup } = RsvpController;
const {
	createQuestion, getQuestion, getQuestionByMeetup,
	downvoteQuestion, upvoteQuestion
} = QuestionController;
const {
	createMeetup, getAMeetup, getAllMeetups, getUpcomingMeetups,
	deleteMeetup
} = MeetupController;


router.route('/auth/signup')
	.post(signupValidator, signup);

router.route('/auth/signin')
	.post(signinValidator, signin);

router.route('/meetups')
	.get(isLogin, getAllMeetups)
	.post(isLogin, imageUpload, createMeetupValidator, createMeetup);

router.route('/meetups/upcoming')
	.get(isLogin, getUpcomingMeetups);

router.route('/meetups/:id')
	.get(isLogin, getParamsValidator, getAMeetup)
	.delete(isLogin, getParamsValidator, deleteMeetup);

router.route('/questions')
	.post(isLogin, createQuestionValidator, createQuestion);

router.route('/questions/:id')
	.get(isLogin, getParamsValidator, getQuestion);

router.route('/meetups/:id/questions')
	.get(isLogin, getParamsValidator, getQuestionByMeetup);

router.route('/comments')
	.post(isLogin, createCommentValidator, createComment);

router.route('/comments/:id')
	.get(isLogin, getParamsValidator, getComment);

router.route('/meetups/:id/rsvps')
	.post(isLogin, getParamsValidator, rsvpValidator, rsvpMeetup);

router.route('/questions/:id/downvote')
	.patch(isLogin, getParamsValidator, downvoteQuestion);

router.route('/questions/:id/upvote')
	.patch(isLogin, getParamsValidator, upvoteQuestion);

export default router;
