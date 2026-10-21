// Converts source photos from _tresci/obrazy into optimised files in public/img.
// Run after adding or changing images:  node scripts/images.mjs
//
// - SITE: hand-picked photos used in layouts (hero, sections), cropped to a fixed size.
// - LOGOS: partner logos, trimmed and scaled to a common height.
// - Product images: every `/img/produkty/<name>.webp` referenced in src/data/oferta.ts
//   is generated from the source file with the same base name.
import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, parse } from 'node:path';

const SRC = '_tresci/obrazy';
const OUT = 'public/img';

const SITE = [
  // [source, output, width, height]
  ['baner-softline.jpg', 'hero-1.webp', 1100, 880],
  ['alu-baner.jpg', 'hero-2.webp', 1100, 880],
  ['szwecja_onrskoldsvik_01.jpg', 'hero-3.webp', 1100, 880],
  ['harmonijka-mb-86_www_header.jpg', 'montaz.webp', 900, 1100],
  ['hs-baner_zCUocqy.jpg', 'montaz-2.webp', 800, 1000],
  ['baner-softline.jpg', 'inspo-1.webp', 1000, 1100],
  ['drzwi_softline_68_dworek.jpg', 'inspo-2.webp', 800, 600],
  ['iglo_light_hq_salon.jpg', 'inspo-3.webp', 800, 600],
  ['roleta-materialowa-6big.jpg', 'inspo-4.webp', 800, 600],
  ['psk__iglo_light_baner.jpg', 'inspo-5.webp', 800, 600],
  ['iglo_light_hq_salon.jpg', 'o-firmie.webp', 1100, 760],
  ['drzwi_softline_68_dworek.jpg', 'biuro.webp', 1100, 880],
  ['house-1353389_1280-1.jpg', 'raty.webp', 1100, 760],
  ['baner-softline.jpg', '../og.jpg', 1200, 630],
  // own photo of the salon (paths containing '/' are relative to the project root)
  ['Materialy/Salon/unnamed.webp', 'salon.webp', 1200, 900],
  ['Materialy/Salon/unnamed.webp', 'salon-pion.webp', 1000, 1100, { left: 330, top: 0, width: 927, height: 1020 }],
];

const LOGOS = [
  ['baner_nowe_logo-e1562737920894.jpg', 'drutex'],
  ['wisniowski-logo.png', 'wisniowski'],
  ['hormann-logo.jpg', 'hormann'],
  ['fakro_cmyk.jpg', 'fakro'],
  ['logo_690x230.png', 'velux'],
  ['logo-DRE-producent-drzwi-CMYK-2018.jpg', 'dre'],
  ['ERKADO-logo-K30.jpg', 'erkado'],
  ['download.png', 'porta'],
  ['pol-skone-logo.jpg', 'pol-skone'],
  ['centurion_logo_poziom.jpg', 'centurion'],
  ['wiked-logo-300x161.png', 'wiked'],
  ['kmt.jpg', 'kmt'],
  ['logo-anwis.jpg', 'anwis'],
  ['expander_logo.png', 'expander'],
  ['NOWE_LOGO_AB_burgund.png', 'alior-bank'],
  ['vds_logo.jpg', 'vds'],
  ['il_logo.jpg', 'infinity-line'],
];

// crops applied before resizing (e.g. to cut an unwanted element out of a stock photo)
const EXTRACT = {
  iglo_energy: { left: 640, top: 0, width: 1280, height: 1282 },
};

const ensure = (dir) => existsSync(dir) || mkdirSync(dir, { recursive: true });
ensure(`${OUT}/partnerzy`);
ensure(`${OUT}/produkty`);

const files = readdirSync(SRC);
const byBase = new Map(files.map((f) => [parse(f).name.toLowerCase(), f]));

let count = 0;

for (const [src, out, w, h, crop] of SITE) {
  const file = src.includes('/') ? src : join(SRC, src);
  if (!existsSync(file)) {
    console.warn(`Pominięto ${out}: brak pliku ${file}`);
    continue;
  }
  const target = join(OUT, out);
  // rotate() applies EXIF orientation, so phone photos are not sideways
  let img = sharp(file).rotate();
  if (crop) img = img.extract(crop);
  img = img.resize(w, h, { fit: 'cover', position: 'attention' });
  await (out.endsWith('.jpg') ? img.jpeg({ quality: 80, mozjpeg: true }) : img.webp({ quality: 78 })).toFile(target);
  count++;
}

for (const [src, name] of LOGOS) {
  await sharp(join(SRC, src))
    .flatten({ background: '#ffffff' })
    .trim({ threshold: 20 })
    .resize({ height: 120, width: 360, fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toFile(join(OUT, 'partnerzy', `${name}.png`));
  count++;
}

// logo + apple touch icon (favicon itself is public/favicon.svg)
await sharp(join(SRC, '_logo-placeholder.png')).trim().png({ compressionLevel: 9 }).toFile(join(OUT, 'logo.png'));

// white version for dark backgrounds: navy letters become white, the red "o" stays red
{
  const { data, info } = await sharp(join(OUT, 'logo.png')).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const [r, , b] = data.subarray(i, i + 3);
    if (r > b + 30) {
      data[i] = 214; data[i + 1] = 72; data[i + 2] = 80;
    } else {
      data[i] = data[i + 1] = data[i + 2] = 255;
    }
  }
  await sharp(data, { raw: info }).png({ compressionLevel: 9 }).toFile(join(OUT, 'logo-white.png'));
  count++;
}
await sharp('public/favicon.svg').resize(180, 180).png().toFile('public/apple-touch-icon.png');
count += 2;

// product images referenced in data (Node 24 strips the TypeScript types on import)
const { categories } = await import('../src/data/oferta.ts');
const data = JSON.stringify(categories);
const referenced = [...new Set([...data.matchAll(/\/img\/produkty\/([\w.-]+?)\.webp/g)].map((m) => m[1]))];
const missing = [];
for (const name of referenced) {
  const src = byBase.get(name.toLowerCase());
  if (!src) {
    missing.push(name);
    continue;
  }
  let pipeline = sharp(join(SRC, src));
  if (EXTRACT[name]) pipeline = pipeline.extract(EXTRACT[name]);
  await pipeline
    .flatten({ background: '#ffffff' })
    .resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(join(OUT, 'produkty', `${name}.webp`));
  count++;
}

console.log(`Gotowe: ${count} plików.`);
if (missing.length) console.warn('Brak źródła dla:', missing.join(', '));
