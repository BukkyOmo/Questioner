import express from 'express';
import meetupController from '../controllers/meetup';
import questionController from '../controllers/question';
import rsvpController from '../controllers/rsvp';
import meetupValidator from '../middleware/meetupValidation';
import questionVlidator from '../middleware/questionValidation';
import UserController from '../dbControllers/user';

const router = express.Router();

router.route('/auth/signup')
	.post(UserController.signup);

router.route('/meetups')
	.get(meetupController.getAllMeetups)
	.post(meetupValidator.createMeetupValidator, meetupController.createMeetup);

router.route('/meetups/upcoming')
	.get(meetupController.getAllUpcomingMeetups);

router.route('/meetups/:meetupId')
	.get(meetupController.getMeetup)
	.delete(meetupController.deleteMeetup);

router.route('/meetups/:meetupId/questions')
	.post(questionVlidator.createQuestionValidator, questionController.createQuestion);

router.route('/meetups/:meetupId/questions/:questionId')
	.get(questionController.getQuestion);

router.route('/meetups/:meetupId/questions/:questionId/upvote')
	.patch(questionController.upvoteQuestion);

router.route('/meetups/:meetupId/questions/:questionId/downvote')
	.patch(questionController.downvoteQuestion);

router.route('/meetups/:meetupId/rsvp')
	.post(rsvpController.createRsvp);

export default router;
