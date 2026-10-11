import { SITE_URL } from "@/lib/seo";
import { getAllProducts } from "@/lib/api";

// Public pages worth indexing (login, admin and reset pages are left out)
const STATIC_PAGES = [
  { path: "/", priority: 1 },
  { path: "/indoor", priority: 0.9 },
  { path: "/outdoor", priority: 0.9 },
  { path: "/crackers", priority: 0.9 },
  { path: "/eventParties", priority: 0.8 },
  { path: "/book", priority: 0.7 },
  { path: "/how-it-works", priority: 0.6 },
  { path: "/safety", priority: 0.6 },
  { path: "/about", priority: 0.5 },
  { path: "/company", priority: 0.5 },
  { path: "/contact", priority: 0.5 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

export default async function sitemap() {
  const products = await getAllProducts();

  const pages = STATIC_PAGES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    priority,
  }));

  const productPages = (Array.isArray(products) ? products : [])
    .filter((product) => product.slug && product.category)
    .map((product) => ({
      url: `${SITE_URL}/${product.category}/${product.slug}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : undefined,
      priority: 0.8,
    }));

  return [...pages, ...productPages];
}
