// routes/physicsRoutes.js
import express from 'express';
import { getAllChapters, getQuestionsByChapter } from '../controllers/physicsController.js';

const router = express.Router();

router.get('/chapters', getAllChapters);
router.get('/chapters/:chapter', getQuestionsByChapter);

export default router;