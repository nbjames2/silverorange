import hardcodedRepos from '../../data/repos.json';
import { Repo } from '../models/Repo';
import { Commit } from '../models/Commit';
import { User } from '../models/User';

const getGitRepos = async () => {
  const res = await fetch('https://api.github.com/users/silverorange/repos');
  let data = [];
  if (res.ok) data = await res.json();
  const allRepos: Repo[] = [...data, ...hardcodedRepos];

  // filter out forks and sort
  const repos: Repo[] = allRepos
    .filter((repo) => !repo.fork)
    .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));

  return repos;
};

const getGitCommit = async (url: string) => {
  const res = await fetch(url);
  let result: Commit | undefined;
  if (res.ok) {
    result = await res.json();
  }

  return result;
};

const getGitUser = async (url: string) => {
  const res = await fetch(url);
  let result: User | undefined;
  if (res.ok) result = await res.json();

  return result;
};

export default {
  getGitRepos,
  getGitCommit,
  getGitUser,
};
