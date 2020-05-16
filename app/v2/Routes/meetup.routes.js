import { Router } from 'express';
import MeetupMiddleware from '../Middlewares/meetup.middleware';
import Authorization from '../Middlewares/authorization.middleware';
import MeetupController from '../Controllers/meetups.controllers';

const router = Router();

router.post('/', Authorization.isLoggedIn, Authorization.isAdmin, MeetupMiddleware.createEditMeetup, MeetupController.createMeetup);
router.patch('/:id', Authorization.isLoggedIn, Authorization.isAdmin, MeetupMiddleware.createEditMeetup, MeetupController.editMeetup);
router.delete('/:id', Authorization.isLoggedIn, Authorization.isAdmin, MeetupController.deleteMeetup);
router.get('/', Authorization.isLoggedIn, MeetupController.getAllMeetups);
router.get('/:id', Authorization.isLoggedIn, MeetupController.getOneMeetup);

export default router;
