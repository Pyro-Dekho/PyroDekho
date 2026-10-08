// Shared SEO settings: site URL, social share (Open Graph / Twitter) cards.

// Live site address, used to build absolute URLs for share cards.
// Set NEXT_PUBLIC_SITE_URL in the environment if the domain differs.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://pyrodekho.com"
).replace(/\/$/, "");

export const SITE_NAME = "PyroDekho";

export const DEFAULT_TITLE = "Pyro Dekho | Buy Imported Cold Pyro";

export const DEFAULT_DESCRIPTION =
  "Buy imported cold pyro, fog and event crackers for weddings, stage shows, clubs and birthdays. Safe, smokeless and delivered all over India.";

// 1200x630 card shown when a page is shared on WhatsApp, Facebook, X, LinkedIn...
export const DEFAULT_SHARE_IMAGE = {
  url: "/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "PyroDekho - Imported cold pyro for every celebration",
};

// Next.js replaces (not merges) a parent's openGraph/twitter when a page sets
// its own, so every page builds the full set here.
//
// title: page title (string, or { absolute } to skip the "| PyroDekho" suffix)
// path: page URL path, e.g. "/indoor"
// images: optional share images (defaults to the PyroDekho card)
export function pageMetadata({ title, description, path = "/", images, ...rest }) {
  const shareTitle =
    typeof title === "object" && title?.absolute
      ? title.absolute
      : title
        ? `${title} | ${SITE_NAME}`
        : DEFAULT_TITLE;
  const shareDescription = description || DEFAULT_DESCRIPTION;
  const shareImages = images?.length ? images : [DEFAULT_SHARE_IMAGE];

  return {
    title,
    description: shareDescription,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_IN",
      url: path,
      title: shareTitle,
      description: shareDescription,
      images: shareImages,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images: shareImages,
    },
    ...rest,
  };
}
