import styles from "./LanguageSwitch.module.css";

export default function LanguageSwitch({ language, onChangeLanguage }) {
  return (
    <div className={styles.language_switch} aria-label="Language switch">
      <button
        className={`${styles.language_button} ${language === "uk" ? styles.active : ""}`}
        type="button"
        onClick={() => onChangeLanguage("uk")}
      >
        UK
      </button>

      <span>|</span>

      <button
        className={`${styles.language_button} ${language === "en" ? styles.active : ""}`}
        type="button"
        onClick={() => onChangeLanguage("en")}
      >
        EN
      </button>

      <span>|</span>

      <button
        className={`${styles.language_button} ${language === "pl" ? styles.active : ""}`}
        type="button"
        onClick={() => onChangeLanguage("pl")}
      >
        PL
      </button>
    </div>
  );
}
