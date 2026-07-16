export function normalisePostcode(value: string): string {
  const compact = value.toUpperCase().replace(/\s+/g, "");
  return compact.length > 3
    ? `${compact.slice(0, -3)} ${compact.slice(-3)}`
    : compact;
}
