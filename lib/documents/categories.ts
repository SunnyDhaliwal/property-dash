export const DEFAULT_DOCUMENT_CATEGORIES = [
  "Tenancy",
  "Compliance",
  "Finance",
  "Maintenance",
  "Correspondence",
  "Photos",
] as const;

export function defaultCategoryRows(organisationId: string) {
  return DEFAULT_DOCUMENT_CATEGORIES.map((name, sortOrder) => ({
    organisation_id: organisationId,
    name,
    slug: name.toLowerCase(),
    sort_order: sortOrder + 1,
    is_system: true,
  }));
}
