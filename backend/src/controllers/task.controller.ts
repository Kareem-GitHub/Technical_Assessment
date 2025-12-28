import { Response } from 'express';
import { AppDataSource } from '../data-source';
import { Task } from '../entities/Task';
import { User } from '../entities/User';
import { AuthRequest } from '../middlewares/auth.middleware';

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;

  const userRepo = AppDataSource.getRepository(User);
  const taskRepo = AppDataSource.getRepository(Task);

  const user = await userRepo.findOneBy({ id: req.userId });

  const task = taskRepo.create({
    title,
    description,
    user: user!,
  });

  await taskRepo.save(task);
  res.status(201).json(task);
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 10, 50);;

  const skip = (page - 1) * limit;

  const taskRepo = AppDataSource.getRepository(Task);

  const [tasks, total] = await taskRepo.findAndCount({
    where: { user: { id: req.userId } },
    order: { createdAt: 'DESC' },
    take: limit,
    skip,
  });

  res.json({
    data: tasks,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status, title, description } = req.body;

  const repo = AppDataSource.getRepository(Task);
  const task = await repo.findOne({
    where: { id: Number(id), user: { id: req.userId } },
  });

  if (!task) return res.status(404).json({ message: 'Task not found' });

  Object.assign(task, { status, title, description });
  await repo.save(task);

  res.json(task);
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const repo = AppDataSource.getRepository(Task);
  const result = await repo.delete({
    id: Number(id),
    user: { id: req.userId },
  });

  if (!result.affected)
    return res.status(404).json({ message: 'Task not found' });

  res.status(204).send();
};
