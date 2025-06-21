import express from 'express';
import {
  getRoles,
} from '../controllers/roleController.js';
import { verifyIsAdmin, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', [verifyToken,verifyIsAdmin], getRoles);

export default router;
