export type TimelineEventType =
  | "property_created"
  | "property_updated"
  | "property_archived"
  | "document_added"
  | "document_updated"
  | "note_added";

export function createTimelineEvent(
  type: TimelineEventType,
  propertyId: string,
  title: string,
  date = new Date(),
) {
  return {
    event_type: type,
    property_id: propertyId,
    title,
    event_date: date.toISOString(),
  };
}
