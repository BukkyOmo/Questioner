import express from 'express';
import rsvpController from '../controllers/rsvp';

const router = express.Router();

router.post('/:meetupId/rsvp', rsvpController.createRsvp);

export default router;
