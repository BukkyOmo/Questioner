import { Router } from 'express';
import Meetup from '../Controllers/meetups.controllers';
import MeetupMiddleware from '../Middlewares/meetup.middleware';
import Authorization from '../Middlewares/authorization.middleware';

const router = Router();

router.post('/', Authorization.isLoggedIn, Authorization.isAdmin, MeetupMiddleware.createEditMeetup, Meetup.createMeetup);
router.patch('/:id', Authorization.isLoggedIn, Authorization.isAdmin, MeetupMiddleware.createEditMeetup, Meetup.editMeetup);

export default router;
