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

  // get all nonfork repos, retry if fail
  const getRepos: () => Promise<any> = useCallback(async () => {
    const res = await fetch('http://localhost:4000/repos');
    if (res.ok) {
      return res.json();
    } else {
      return getRepos();
    }
  }, []);

  useEffect(() => {
    // fetch data
    const hydrateData = async () => {
      const data = await getRepos();

      setAllRepos(data);
    };

    hydrateData();
  }, [getRepos]);

  // generate list of languages from the full repos list
  useEffect(() => {
    const languageSet = new Set<string>();
    for (const repo of allRepos) {
      languageSet.add(repo.language);
    }
    const languageArray: string[] = Array.from(languageSet);
    setLanguageList(languageArray);
  }, [allRepos]);

  // filter for only selected language
  useEffect(() => {
    if (language) {
      const repos = allRepos.filter((repo) => repo.language === language);
      setDisplayRepos(repos);
    } else {
      setDisplayRepos(allRepos);
    }
  }, [language, allRepos]);

  // stop background from scrolling when modal is open
  useEffect(() => {
    const body = document.body;
    if (selectedRepo) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
  }, [selectedRepo]);

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
      {/* // show modal only if one is clicked */}
      {selectedRepo && (
        <RepoModal
          repo={selectedRepo}
          closeModal={() => setSelectedRepo(null)}
        />
      )}
    </div>
  );
}
