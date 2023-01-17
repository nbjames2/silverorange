import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Repo } from '../../../types/Repo';
import { CloseButton } from '../CloseButton/CloseButton';
import './RepoModal.css';
import { Commit } from '../../../types/Commit';

interface Props {
  repo: Repo;
  closeModal: () => void;
}

function RepoModal({ repo, closeModal }: Props) {
  const [commit, setCommit] = useState<Commit>();
  const [readme, setReadme] = useState<string>();

  // get most recent commit and readme
  useEffect(() => {
    const getCommit = async () => {
      const res = await fetch(repo.commits_url.replace('{/sha}', ''));
      if (res.ok) {
        const data = await res.json();
        const sortedCommits = data.sort(
          (a: Commit, b: Commit) =>
            Date.parse(b.commit.author.date) - Date.parse(a.commit.author.date)
        );

        setCommit(sortedCommits[0]);
      }
    };

    const getReadme = async () => {
      const res = await fetch(
        `https://raw.githubusercontent.com/${repo.full_name}/master/README.md`
      );
      if (res.ok) {
        if (res.body) {
          const data = await res.text();
          console.log(data);
          setReadme(data);
        }
      }
    };

    getCommit();
    getReadme();
  }, [repo.commits_url, repo.full_name]);

  return (
    <div className="repomodal-container">
      <div className="repomodal">
        <CloseButton onClick={closeModal} />
        <div>Most recent commit date: {commit?.commit.author.date}</div>
        <div>Author: {commit?.commit.author.name}</div>
        <div>Message: {commit?.commit.message}</div>
        <div>{readme && <ReactMarkdown>{readme}</ReactMarkdown>}</div>
      </div>
    </div>
  );
}

export { RepoModal };
