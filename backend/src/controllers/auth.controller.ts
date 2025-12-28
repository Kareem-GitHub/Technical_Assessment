import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { hashPassword, comparePassword } from '../utils/password';
import { signToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const repo = AppDataSource.getRepository(User);

  const exists = await repo.findOne({ where: { email } });
  if (exists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const user = repo.create({
    name,
    email,
    password: await hashPassword(password),
  });

  await repo.save(user);

  res.status(201).json({ message: 'User registered' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOne({ where: { email } });

  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken({ userId: user.id });

  res.json({ token });
};
