import express from 'express';
import getMeetup from '../controllers/meetup';

const router = express.Router();
router.get('/meetups/:meetupId', getMeetup);

export default router;
