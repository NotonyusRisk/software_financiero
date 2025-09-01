import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  const valid = await bcrypt.compare(password, user.getDataValue('password_hash'));
  if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.getDataValue('id') }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

  res.json({ token });
};
