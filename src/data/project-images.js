const context = require.context(
  "../assets/pictures",
  true,
  /\.(png|jpe?g|webp|gif)$/i,
);

const imagesBySlug = {};

context.keys().forEach((key) => {
  const match = key.match(/^\.\/([^/]+)\/(.+)$/);
  if (!match) return;

  const [, slug, filename] = match;

  if (!imagesBySlug[slug]) {
    imagesBySlug[slug] = [];
  }

  imagesBySlug[slug].push({ filename, src: context(key) });
});

Object.values(imagesBySlug).forEach((images) => {
  images.sort((a, b) =>
    a.filename.localeCompare(b.filename, undefined, { numeric: true }),
  );
});

const stripExt = (filename) => filename.replace(/\.[^./]+$/, "");

export function getProjectGallery(slug) {
  const images = imagesBySlug[slug] || [];
  if (images.length === 0) return [];

  const coverIndex = images.findIndex((img) => stripExt(img.filename) === slug);
  if (coverIndex === -1) return images.map((img) => img.src);

  const cover = images[coverIndex];
  const rest = images.filter((_, i) => i !== coverIndex);
  return [cover, ...rest].map((img) => img.src);
}

export function getProjectCover(slug) {
  const images = imagesBySlug[slug] || [];
  const cover = images.find((img) => stripExt(img.filename) === slug);
  return cover ? cover.src : images[0]?.src;
}
