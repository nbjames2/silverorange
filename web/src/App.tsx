import { useCallback, useEffect, useState } from 'react';

import { RepoCard } from './components';
import { Repo } from '../types/Repo';
import './App.css';

export function App() {
  const [repos, setRepos] = useState<Repo[]>([]);

  const getRepos: () => Promise<any> = useCallback(async () => {
    const res = await fetch('http://localhost:4000/repos');
    if (res.ok) {
      return res.json();
    } else {
      return getRepos();
    }
  }, []);

  useEffect(() => {
    console.log('got here');
    // fetch data
    const hydrateData = async () => {
      const data = await getRepos();

      setRepos(data);
    };

    hydrateData();
  }, [getRepos]);

  return (
    <div className="App">
      {repos.map((repo) => {
        return <RepoCard key={repo.id} repo={repo} />;
      })}
    </div>
  );
}
