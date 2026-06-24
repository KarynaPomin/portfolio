export default function PricePage({ text }) {
  return (
    <section className="page" id="prices" data-section="prices">
      <div className="content">
        <header className="section-header">
          <p className="corner-pig left" aria-hidden="true">
            🐷
          </p>
          <p className="corner-pig right" aria-hidden="true">
            🐷
          </p>
          <h2>{text.pricesTitle}</h2>
          <p>{text.pricesSubtitle}</p>
        </header>

        <div className="pricing-list">
          <details className="price-group" open>
            <summary>{text.groupWebsites}</summary>
            <div className="price-rows">
              <PriceRow title={text.onePageTitle} description={text.onePageDesc} price={text.onePagePrice} />
              <PriceRow title={text.simpleSiteTitle} description={text.simpleSiteDesc} price={text.simpleSitePrice} />
              <PriceRow title={text.largeSiteTitle} description={text.largeSiteDesc} price={text.largeSitePrice} />
            </div>
          </details>

          <details className="price-group" open>
            <summary>{text.groupAddons}</summary>
            <div className="price-rows compact">
              <PriceRow title={text.contactForm} price={text.contactFormPrice} />
              <PriceRow title={text.gallery} price={text.galleryPrice} />
              <PriceRow title={text.map} price={text.mapPrice} />
              <PriceRow title={text.blog} price={text.blogPrice} />
              <PriceRow title={text.multilang} price={text.multilangPrice} />
              <PriceRow title={text.booking} price={text.bookingPrice} />
              <PriceRow title={text.seo} price={text.seoPrice} />
            </div>
          </details>

          <details className="price-group">
            <summary>{text.groupMedia}</summary>
            <div className="price-rows compact">
              <PriceRow title={text.photos} price={text.photosPrice} />
              <PriceRow title={text.shortVideo} price={text.shortVideoPrice} />
              <PriceRow title={text.photoEdit} price={text.photoEditPrice} />
              <PriceRow title={text.videoEdit} price={text.videoEditPrice} />
            </div>
          </details>

          <details className="price-group">
            <summary>{text.groupHosting}</summary>
            <div className="price-rows compact">
              <PriceRow title={text.hostingSetup} price={text.hostingSetupPrice} />
              <PriceRow title={text.maintenance} price={text.maintenancePrice} />
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
