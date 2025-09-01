import { Request, Response } from 'express';
import { Movement } from '../models/movement.model';

export const createMovement = async (req: Request, res: Response) => {
  const { type, amount, description, date } = req.body;
  const userId = (req as any).user.id;

  try {
    const movement = await Movement.create({ type, amount, description, date, user_id: userId });
    res.status(201).json(movement);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el movimiento.', error });
  }
};

export const getMovements = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { type, month, year } = req.query;

  const filters: any = { user_id: userId };
  if (type) filters.type = type;
  if (month && year) {
    filters.date = {
      $between: [`${year}-${month}-01`, `${year}-${month}-31`]
    };
  }

  try {
    const movements = await Movement.findAll({ where: filters });
    res.status(200).json(movements);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener movimientos.', error });
  }
};
