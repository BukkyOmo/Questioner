import express from 'express';
import questionController from '../controllers/question';

const router = express.Router();

router.post('/:meetupsId/questions', questionController.createQuestion);

export default router;
