import { Router, Request, Response } from 'express';
import { Repo } from '../models/Repo';
import { Commit } from '../models/Commit';
import { User } from '../models/User';
import gitController from '../controllers/gitController';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  const result: Repo[] = await gitController.getGitRepos();
  res.json(result);
});
