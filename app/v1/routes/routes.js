import express from 'express';
import meetupValidator from '../middleware/meetupValidator';
import userValidator from '../middleware/userValidator';
import paramsValidator from '../middleware/paramsValidator';
import UserController from '../dbControllers/UserController';
import MeetupController from '../dbControllers/MeetupController';

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

export default router;
