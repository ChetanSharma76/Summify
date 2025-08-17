import express from 'express';
import { shareEmail, testShareRoute } from '../controllers/shareController.js';

const router = express.Router();

router.post('/email', shareEmail);
router.get('/test', testShareRoute);

export default router;
