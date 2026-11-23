// Turns an inline CSS string ("color: red; --p: 0") into a React style object.
// Results are cached because the same strings are used on every render.
const cache = new Map();

export function sx(css) {
  if (!css) return undefined;
  const hit = cache.get(css);
  if (hit) return hit;
  const style = {};
  for (const decl of css.split(';')) {
    const i = decl.indexOf(':');
    if (i === -1) continue;
    const prop = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (!prop) continue;
    const key = prop.startsWith('--')
      ? prop
      : prop.replace(/^-(webkit|moz|ms)-/, (_, v) => v.charAt(0).toUpperCase() + v.slice(1) + '-')
            .replace(/-([a-z])/g, (_, ch) => ch.toUpperCase());
    style[key] = value;
  }
  if (cache.size > 2000) cache.clear();
  cache.set(css, style);
  return style;
}
