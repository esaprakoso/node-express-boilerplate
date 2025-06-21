import express from 'express';
import authRoutes from './auth.js';
import userRoutes from './user.js';
import profileRoutes from './profile.js';
import roleRoutes from './role.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger.js';
const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);
router.use('/api/profile', profileRoutes);
router.use('/api/roles', roleRoutes);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;