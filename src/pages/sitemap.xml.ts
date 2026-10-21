import type { APIRoute } from 'astro';
import { categories } from '../data/oferta';
import { url } from '../lib/url';

const pages = ['/', '/o-firmie/', ...categories.map((c) => `/${c.slug}/`), '/kredyty-i-raty/', '/kontakt/', '/polityka-prywatnosci/'];

export const GET: APIRoute = ({ site }) => {
  const urls = pages.map((p) => `  <url><loc>${new URL(url(p), site)}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
