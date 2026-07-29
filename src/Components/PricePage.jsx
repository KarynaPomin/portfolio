import styles from "./PricePage.module.css";
import generalStyles from "../App.module.css";

export default function PricePage({ text }) {
  return (
    <section className={generalStyles.page} id="prices" data-section="prices">
      <div className={generalStyles.content}>
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
          <h2>{text.pricesTitle}</h2>
          <p>{text.pricesSubtitle}</p>
        </header>

        <div className={styles.pricing_list}>
          <details className={styles.price_group} open>
            <summary>{text.groupWebsites}</summary>
            <div className={styles.price_rows}>
              <PriceRow
                title={text.onePageTitle}
                description={text.onePageDesc}
                price={text.onePagePrice}
              />
              <PriceRow
                title={text.simpleSiteTitle}
                description={text.simpleSiteDesc}
                price={text.simpleSitePrice}
              />
              <PriceRow
                title={text.largeSiteTitle}
                description={text.largeSiteDesc}
                price={text.largeSitePrice}
              />
            </div>
          </details>

          <details className={styles.price_group} open>
            <summary>{text.groupAddons}</summary>
            <div className={`${styles.price_rows} ${styles.compact}`}>
              <PriceRow
                title={text.contactForm}
                price={text.contactFormPrice}
              />
              <PriceRow title={text.gallery} price={text.galleryPrice} />
              <PriceRow title={text.blog} price={text.blogPrice} />
              <PriceRow title={text.multilang} price={text.multilangPrice} />
              <PriceRow title={text.booking} price={text.bookingPrice} />
              <PriceRow title={text.animation} price={text.animationPrice} />
              <PriceRow
                title={text.customerReviewsSection}
                price={text.customerReviewsSectionPrice}
              />
              <PriceRow title={text.seo} price={text.seoPrice} />
            </div>
          </details>

          <details className={styles.price_group}>
            <summary>{text.groupMedia}</summary>
            <div className={`${styles.price_rows} ${styles.compact}`}>
              <PriceRow title={text.photos} price={text.photosPrice} />
              <PriceRow title={text.shortVideo} price={text.shortVideoPrice} />
              <PriceRow title={text.photoEdit} price={text.photoEditPrice} />
              <PriceRow title={text.videoEdit} price={text.videoEditPrice} />
            </div>
          </details>

          <details className={styles.price_group}>
            <summary>{text.groupHosting}</summary>
            <div className={`${styles.price_rows} ${styles.compact}`}>
              <PriceRow
                title={text.hostingSetup}
                price={text.hostingSetupPrice}
              />
              <PriceRow
                title={text.maintenance}
                price={text.maintenancePrice}
              />
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

function PriceRow({ title, description, price }) {
  return (
    <article>
      <div>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
      <strong>{price}</strong>
    </article>
  );
}
