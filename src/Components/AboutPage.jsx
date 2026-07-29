import styles from "./AboutPage.module.css";
import generalStyles from "../App.module.css";

export default function AboutPage({ text }) {
  return (
    <section
      className={`${generalStyles.page} ${generalStyles.hero_page}`}
      id="home"
      data-section="home"
    >
      <div className={`${generalStyles.content} ${generalStyles.narrow}`}>
        <header className={generalStyles.section_header}>
          <p
            className={`${generalStyles.corner_paper} ${generalStyles.left}`}
            aria-hidden="true"
          >
            <img src="/projects/paper.png" alt="paper" loading="lazy" />
          </p>
          <p
            className={`${generalStyles.corner_paper} ${generalStyles.right}`}
            aria-hidden="true"
          >
            <img src="/projects/paper.png" alt="paper" loading="lazy" />
          </p>
        </header>

        <p className={generalStyles.kicker}>{text.heroKicker}</p>
        <h1>{text.heroTitle}</h1>
        <p className={styles.stack}>
          React <span /> JavaScript <span /> TypeScript <span /> PHP <span />{" "}
          MySQL
        </p>

        <div className={generalStyles.actions}>
          <a className={generalStyles.primary_action} href="#prices">
            {text.quoteButton}
          </a>
          <a className={generalStyles.secondary_action} href="#projects">
            {text.projectsButton}
          </a>
        </div>

        <div className={styles.contact}>
          <h2>{text.contactTitle}</h2>
          <dl>
            <div>
              <dt>GitHub</dt>
              <dd>
                <a href="https://github.com/KarynaPomin" target="_blank">
                  https://github.com/KarynaPomin
                </a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href="mailto:karyna.pomin@gmail.com">
                  karyna.pomin@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd>
                <a
                  href="https://www.instagram.com/web.by.kar?igsh=NXlsb2FnOXJiY2hm"
                  target="_blank"
                >
                  web.by.kar
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
