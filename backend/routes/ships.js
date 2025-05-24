import express from 'express';
import { getShips } from '../controllers/shipController.js';

const router = express.Router();
router.get('/', getShips);

export default router;
