import express from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { verifyToken, verifyIsAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', [verifyToken, verifyIsAdmin], getUsers);
router.get('/:id', [verifyToken, verifyIsAdmin], getUserById);
router.put('/:id', [verifyToken, verifyIsAdmin], updateUser);
router.delete('/:id', [verifyToken, verifyIsAdmin], deleteUser);

export default router;
