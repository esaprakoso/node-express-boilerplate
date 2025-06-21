import express from 'express';
import {
  getProfile,
  updateProfile,
  updatePassword,
} from '../controllers/profileController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getProfile);
router.patch('/', verifyToken, updateProfile);
router.patch('/password', verifyToken, updatePassword);

export default router;
