import { Repo } from '../../../types/Repo';
import './RepoCard.css';

interface Props {
  repo: Repo;
  setSelectedRepo: (repo: Repo) => void;
}

function RepoCard({ repo, setSelectedRepo }: Props) {
  return (
    <div
      key={repo.id}
      className="repocard-container"
      onClick={() => setSelectedRepo(repo)}
    >
      <div>Name: {repo.name}</div>
      <div>Description: {repo.description}</div>
      <div>Language: {repo.language}</div>
      <div>Forks Count: {repo.forks_count}</div>
    </div>
  );
}

export { RepoCard };
