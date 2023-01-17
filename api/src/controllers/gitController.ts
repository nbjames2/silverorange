import hardcodedRepos from '../../data/repos.json';
import { Repo } from '../models/Repo';

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

export default {
  getGitRepos,
};
