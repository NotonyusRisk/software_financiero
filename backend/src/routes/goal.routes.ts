import { Router } from 'express';
import { createGoal, getGoals } from '../controllers/goal.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);
router.post('/', createGoal);
router.get('/', getGoals);

export default router;
