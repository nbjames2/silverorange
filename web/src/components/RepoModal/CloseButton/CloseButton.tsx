import './CloseButton.css';

interface Props {
  onClick: () => void;
}

function CloseButton({ onClick }: Props) {
  return (
    <div className="close-button" onClick={() => onClick()}>
      Close
    </div>
  );
}

export { CloseButton };
