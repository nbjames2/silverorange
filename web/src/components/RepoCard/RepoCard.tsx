import { Repo } from '../../../types/Repo';
import './RepoCard.css';

interface Props {
  repo: Repo;
}

function RepoCard({ repo }: Props) {
  return (
    <div key={repo.id} className="repocard-container">
      <div>Name: {repo.name}</div>
      <div>Description: {repo.description}</div>
      <div>Language: {repo.language}</div>
      <div>Forks Count: {repo.forks_count}</div>
    </div>
  );
}

export { RepoCard };
