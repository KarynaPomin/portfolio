// IMPORTANT: for require.context to work with CRA (webpack), images must live
// inside src/, NOT in public/. Move your folders from:
//   public/pictures/<slug>/...
// to:
//   src/assets/pictures/<slug>/...
//
// Inside each folder, the file whose name (without extension) matches the
// slug is treated as the cover image, e.g. for slug "morning-coffee-house":
//   src/assets/pictures/morning-coffee-house/morning-coffee-house.jpg  <- cover
//   src/assets/pictures/morning-coffee-house/1.jpg
//   src/assets/pictures/morning-coffee-house/2.jpg
//   ...

const context = require.context(
  "../assets/pictures",
  true,
  /\.(png|jpe?g|webp|gif)$/i,
);

// Build a map: { [slug]: [{ filename, src }, ...] }
const imagesBySlug = {};

context.keys().forEach((key) => {
  // key looks like "./morning-coffee-house/1.jpg"
  const match = key.match(/^\.\/([^/]+)\/(.+)$/);
  if (!match) return;

  const [, slug, filename] = match;

  if (!imagesBySlug[slug]) {
    imagesBySlug[slug] = [];
  }

  imagesBySlug[slug].push({ filename, src: context(key) });
});

// Sort naturally (1, 2, 10 — not 1, 10, 2) so gallery order is predictable
Object.values(imagesBySlug).forEach((images) => {
  images.sort((a, b) =>
    a.filename.localeCompare(b.filename, undefined, { numeric: true }),
  );
});

const stripExt = (filename) => filename.replace(/\.[^./]+$/, "");

/**
 * Full gallery for a project, cover image first (if found), then the rest
 * in natural filename order.
 */
export function getProjectGallery(slug) {
  const images = imagesBySlug[slug] || [];
  if (images.length === 0) return [];

  const coverIndex = images.findIndex((img) => stripExt(img.filename) === slug);
  if (coverIndex === -1) return images.map((img) => img.src);

  const cover = images[coverIndex];
  const rest = images.filter((_, i) => i !== coverIndex);
  return [cover, ...rest].map((img) => img.src);
}

/**
 * Single cover image for a project card (file named exactly `<slug>.<ext>`).
 * Falls back to the first image found if no dedicated cover file exists.
 */
export function getProjectCover(slug) {
  const images = imagesBySlug[slug] || [];
  const cover = images.find((img) => stripExt(img.filename) === slug);
  return cover ? cover.src : images[0]?.src;
}
