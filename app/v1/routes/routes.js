import express from 'express';
import meetupValidator from '../middleware/meetupValidator';
import userValidator from '../middleware/userValidator';
import questionValidator from '../middleware/questionValidator';
import paramsValidator from '../middleware/paramsValidator';
import UserController from '../dbControllers/UserController';
import MeetupController from '../dbControllers/MeetupController';
import QuestionController from '../dbControllers/QuestionController';

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
	.delete(paramsValidator.getParamsValidator, MeetupController.deleteMeetup);

router.route('/questions')
	.post(questionValidator.createQuestionValidator, QuestionController.createQuestion);

router.route('/questions/:id')
	.get(paramsValidator.getParamsValidator, QuestionController.getQuestion);

router.route('/questions/:id/upvote')
	.patch(paramsValidator.getParamsValidator, QuestionController.upvoteQuestion);

export default router;
