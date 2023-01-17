import { Repo } from '../../../types/Repo';
import { CloseButton } from '../CloseButton/CloseButton';
import './RepoModal.css';

interface Props {
  repo: Repo;
  closeModal: () => void;
}

function RepoModal({ repo, closeModal }: Props) {
  return (
    <div className="repomodal-container">
      <div className="repomodal">
        <CloseButton onClick={closeModal} />
        <div>Most recent commit date: </div>
        <div>Author: </div>
        <div>Message: </div>
      </div>
    </div>
  );
}

export { RepoModal };
