import { Router } from 'express';
import { createMovement, getMovements } from '../controllers/movement.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);
router.post('/', createMovement);
router.get('/', getMovements);

export default router;
