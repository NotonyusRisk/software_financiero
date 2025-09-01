import { Router } from 'express';
import { createBudget, getBudgets } from '../controllers/budget.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);
router.post('/', createBudget);
router.get('/', getBudgets);

export default router;
