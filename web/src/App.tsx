import { useCallback, useEffect, useState } from 'react';

import { RepoCard, RepoModal } from './components';
import { Repo } from '../types/Repo';
import './App.css';
import { LanguageButtons } from './components';

export function App() {
  const [allRepos, setAllRepos] = useState<Repo[]>([]);
  const [displayRepos, setDisplayRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [languageList, setLanguageList] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>('');

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

      setAllRepos(data);
    };

    hydrateData();
  }, [getRepos]);

  useEffect(() => {
    const languageSet = new Set<string>();
    for (const repo of allRepos) {
      languageSet.add(repo.language);
    }
    const languageArray: string[] = Array.from(languageSet);
    setLanguageList(languageArray);
  }, [allRepos]);

  useEffect(() => {
    if (language) {
      const repos = allRepos.filter((repo) => repo.language === language);
      setDisplayRepos(repos);
    } else {
      setDisplayRepos(allRepos);
    }
  }, [language, allRepos]);

  return (
    <div className="App">
      <LanguageButtons
        selectedLanguage={language}
        languages={languageList}
        onLanguageSelect={setLanguage}
      />
      {displayRepos.map((repo) => {
        return (
          <RepoCard
            key={repo.id}
            repo={repo}
            setSelectedRepo={setSelectedRepo}
          />
        );
      })}
      {selectedRepo && (
        <RepoModal
          repo={selectedRepo}
          closeModal={() => setSelectedRepo(null)}
        />
      )}
    </div>
  );
}
