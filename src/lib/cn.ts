type ClassValue = string | number | false | null | undefined;

/** Joins truthy class names together — a minimal `clsx` replacement. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
