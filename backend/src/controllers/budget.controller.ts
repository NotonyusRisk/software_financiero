import { Request, Response } from 'express';
import { Budget } from '../models/budget.model';

export const createBudget = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { amount, month, year } = req.body;

  try {
    const budget = await Budget.create({ user_id: userId, amount, month, year });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el presupuesto.', error });
  }
};

export const getBudgets = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const budgets = await Budget.findAll({ where: { user_id: userId } });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener presupuestos.', error });
  }
};
