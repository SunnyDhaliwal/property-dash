import type { PropertyRecord } from "@/lib/database/types";

export function archiveProperty(
  property: PropertyRecord,
  archivedAt = new Date(),
): PropertyRecord {
  if (property.status === "archived") return property;
  return {
    ...property,
    status: "archived",
    archived_at: archivedAt.toISOString(),
  };
}
