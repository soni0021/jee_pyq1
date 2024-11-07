// routes/mathsRoutes.js
import express from 'express';
import { getAllChapters, getQuestionsByChapter } from '../controllers/mathsController.js';

const router = express.Router();

router.get('/chapters', getAllChapters);
router.get('/chapters/:chapter', getQuestionsByChapter);

export default router;