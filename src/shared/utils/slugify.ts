/** Converts free text into a URL/id-safe slug, e.g. "Butter Chicken" -> "butter-chicken". */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Appends -2, -3, ... to a slug until it doesn't collide with any existing id. */
export function uniqueSlug(base: string, existingIds: string[]): string {
  const existing = new Set(existingIds);
  if (!existing.has(base)) return base;

  let suffix = 2;
  while (existing.has(`${base}-${suffix}`)) {
    suffix += 1;
  }
  return `${base}-${suffix}`;
}
