import './LanguageButtons.css';

interface Props {
  selectedLanguage: string;
  languages: string[];
  onLanguageSelect: (value: string) => void;
}

function LanguageButtons({
  selectedLanguage,
  languages,
  onLanguageSelect,
}: Props) {
  return (
    <div className="language-buttons-container">
      {languages.map((language) => (
        <button
          key={language}
          className={`language-button ${
            language === selectedLanguage && 'selected'
          }`}
          onClick={() => onLanguageSelect(language)}
        >
          {language}
        </button>
      ))}
      <button className="language-button" onClick={() => onLanguageSelect('')}>
        Clear
      </button>
    </div>
  );
}

export { LanguageButtons };
