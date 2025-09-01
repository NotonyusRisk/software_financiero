import { Router } from 'express';
import authRoutes from './auth.routes';
import movementRoutes from './movement.routes';
import goalRoutes from './goal.routes';
import budgetRoutes from './budget.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/movements', movementRoutes);
router.use('/goals', goalRoutes);
router.use('/budgets', budgetRoutes);

export default router;
