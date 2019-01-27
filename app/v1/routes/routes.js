import express from 'express';
import meetupValidator from '../middleware/meetupValidation';
import UserController from '../dbControllers/UserController';
import MeetupController from '../dbControllers/MeetupController';

const router = express.Router();

router.route('/auth/signup')
	.post(UserController.signup);

router.route('/auth/signin')
	.post(UserController.signin);

router.route('/meetups')
	.get(MeetupController.getAllMeetups)
	.post(meetupValidator.createMeetupValidator, MeetupController.createMeetup);

export default router;
