import express from 'express';
import meetupController from '../controllers/meetup';

const router = express.Router();

router.get('/meetups/:meetupId', meetupController.getMeetup);
router.get('/meetups', meetupController.getAllMeetups);
router.post('/meetups', meetupController.createMeetup);

export default router;
