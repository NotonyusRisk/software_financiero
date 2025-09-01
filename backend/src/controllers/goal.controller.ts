import { Request, Response } from 'express';
import { Goal } from '../models/goal.model';

export const createGoal = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { name, target_amount, deadline } = req.body;

  try {
    const goal = await Goal.create({ user_id: userId, name, target_amount, deadline, current_amount: 0 });
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la meta.', error });
  }
};

export const getGoals = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const goals = await Goal.findAll({ where: { user_id: userId } });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener metas.', error });
  }
};
