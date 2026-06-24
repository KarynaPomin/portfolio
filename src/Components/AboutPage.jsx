export default function AboutPage({ text }) {
  return (
    <section className="page hero-page" id="home" data-section="home">
      <div className="content narrow">
        <p className="kicker">{text.heroKicker}</p>
        <h1>{text.heroTitle}</h1>
        <p className="stack">
          React <span /> JavaScript <span /> TypeScript <span /> PHP <span /> MySQL
        </p>

        <div className="actions">
          <a className="primary-action" href="#prices">
            {text.quoteButton}
          </a>
          <a className="secondary-action" href="#projects">
            {text.projectsButton}
          </a>
        </div>

        <div className="contact">
          <h2>{text.contactTitle}</h2>
          <dl>
            <div>
              <dt>GitHub</dt>
              <dd>
                <a href="https://github.com/KarynaPomin">https://github.com/KarynaPomin</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href="mailto:karyna.pomin@gmail.com">karyna.pomin@gmail.com</a>
              </dd>
            </div>
            <div>
              <dt>{text.phoneLabel}</dt>
              <dd>
                <a href="tel:+48574755459">+48 574 755 459</a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
