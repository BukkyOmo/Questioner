import express from 'express';
import meetupValidator from '../middleware/meetupValidation';
import signupValidator from '../middleware/signupValidation';
import questionVlidator from '../middleware/questionValidation';
import UserController from '../dbControllers/user';
import MeetupController from '../dbControllers/meetup';

const router = express.Router();

router.route('/auth/signup')
	.post(signupValidator.signupValidator, UserController.signup);

router.route('/auth/signin')
	.post(signupValidator.signupValidator, UserController.signin);

router.route('/meetups')
	.get(MeetupController.getAllMeetups)
	.post(meetupValidator.createMeetupValidator, MeetupController.createMeetup);

export default router;
