export default function LanguageSwitch({ language, onChangeLanguage }) {
  return (
    <div className="language-switch" aria-label="Language switch">
      <button
        className={`language-button ${language === "uk" ? "active" : ""}`}
        type="button"
        onClick={() => onChangeLanguage("uk")}
      >
        UK
      </button>

      <span>|</span>

      <button
        className={`language-button ${language === "en" ? "active" : ""}`}
        type="button"
        onClick={() => onChangeLanguage("en")}
      >
        EN
      </button>

      <span>|</span>

      <button
        className={`language-button ${language === "pl" ? "active" : ""}`}
        type="button"
        onClick={() => onChangeLanguage("pl")}
      >
        PL
      </button>
    </div>
  );
}
