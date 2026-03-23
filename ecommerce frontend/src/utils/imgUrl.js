
export function imgUrl(rawPath) {
  if (!rawPath) return "";
  // If already absolute, return as-is
  if (/^https?:\/\//i.test(rawPath)) return rawPath;

  // Legacy: "/src/assets/<file>" → "/products/<file>" served by Netlify from /public/products
  const normalized = rawPath
    .replace(/^\s*\/src\/assets\/?/i, "/products/")  // point to public/products
    .replace(/\\/g, "/")
    .trim();

  return normalized;
}