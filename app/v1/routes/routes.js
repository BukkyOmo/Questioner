import express from 'express';
import meetupValidator from '../middleware/meetupValidator';
import UserValidator from '../middleware/UserValidator';
import QuestionValidator from '../middleware/QuestionValidator';
import ParamsValidator from '../middleware/ParamsValidator';
import UserController from '../dbControllers/UserController';
import MeetupController from '../dbControllers/MeetupController';
import QuestionController from '../dbControllers/QuestionController';

const router = express.Router();

router.route('/auth/signup')
	.post(UserValidator.signupValidator, UserController.signup);

router.route('/auth/signin')
	.post(UserController.signin);

router.route('/meetups')
	.get(MeetupController.getAllMeetups)
	.post(meetupValidator.createMeetupValidator, MeetupController.createMeetup);

router.route('/meetups/:id')
	.get(ParamsValidator.getParamsValidator, MeetupController.getAMeetup);

router.route('/questions')
	.post(QuestionValidator.createQuestionValidator, QuestionController.createQuestion);

router.route('/questions/:id')
	.get(ParamsValidator.getParamsValidator, QuestionController.getQuestion);

router.route('/questions/:id/downvote')
	.patch(ParamsValidator.getParamsValidator, QuestionController.downvoteQuestion);

router.route('/questions/:id/upvote')
	.patch(ParamsValidator.getParamsValidator, QuestionController.upvoteQuestion);

export default router;
