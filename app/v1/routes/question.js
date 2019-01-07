import express from 'express';
import questionController from '../controllers/question';

const router = express.Router();

router.post('/:meetupsId/questions', questionController.createQuestion);
router.patch('/:meetupId/questions/:id', questionController.upvoteQuestion);

export default router;
