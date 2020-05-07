import { Router } from 'express';
import Meetup from '../Controllers/meetups.controllers';
import MeetupMiddleware from '../Middlewares/meetup.middleware';
import Authorization from '../Middlewares/authorization.middleware';

const router = Router();

router.post('/', Authorization.isLoggedIn, Authorization.isAdmin, MeetupMiddleware.createMeetup, Meetup.createMeetup);

export default router;
