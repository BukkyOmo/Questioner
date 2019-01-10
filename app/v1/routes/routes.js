import express from 'express';
import meetupController from '../controllers/meetup';
import questionController from '../controllers/question';
import rsvpController from '../controllers/rsvp';

const router = express.Router();

router.route('/meetups')
	.get(meetupController.getAllMeetups)
	.post(meetupController.createMeetup);

router.route('/meetups/:meetupId')
	.get(meetupController.getMeetup);

router.route('/meetups/:meetupId/questions')
	.post(questionController.createQuestion);

router.route('/questions/:id')
	.get(questionController.getQuestion);

router.route('/meetups/:meetupId/questions/:id/upvote')
	.patch(questionController.upvoteQuestion);

router.route('/meetups/:meetupId/questions/:id/downvote')
	.patch(questionController.downvoteQuestion);

router.route('/meetups/:meetupId/rsvp')
	.post(rsvpController.createRsvp);

export default router;
