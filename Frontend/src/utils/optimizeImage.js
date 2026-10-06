// Adds Cloudinary transformations (auto format, auto quality, max width)
// so the browser downloads a small image instead of the full-size original.
export default function optimizeImage(url, width = 500) {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }
  if (url.includes("/upload/f_auto")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
}
