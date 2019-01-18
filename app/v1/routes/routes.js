import express from 'express';
import meetupValidator from '../middleware/meetupValidation';
import questionVlidator from '../middleware/questionValidation';
import UserController from '../dbControllers/user';
import MeetupController from '../dbControllers/meetup';

const router = express.Router();

router.route('/auth/signup')
	.post(UserController.signup);

router.route('/auth/signin')
	.post(UserController.signin);

router.route('/meetups')
	.post(meetupValidator.createMeetupValidator, MeetupController.createMeetup);

export default router;
