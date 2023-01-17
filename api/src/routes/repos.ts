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

repos.get('/commit', async (req: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  const { url }: { url: string } = req.body;
  const result: Commit | undefined = await gitController.getGitCommit(url);
  res.json(result);
});

repos.get('/user', async (req: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  const { url }: { url: string } = req.body;
  const result: User | undefined = await gitController.getGitUser(url);
  res.json(result);
});
