import './CloseButton.css';

interface Props {
  onClick: () => void;
}

function CloseButton({ onClick }: Props) {
  return (
    <div className="close-button" onClick={() => onClick()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#000"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}

export { CloseButton };
