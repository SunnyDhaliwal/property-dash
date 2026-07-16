export type PropertyStatus = "active" | "inactive" | "archived";
export type OrganisationRole = "owner" | "admin" | "member" | "viewer";

export interface PropertyRecord {
  id: string;
  organisation_id: string;
  display_name: string;
  address_line_1: string;
  address_line_2: string | null;
  town_or_city: string;
  county: string | null;
  postcode: string;
  ownership_entity_name: string | null;
  property_type: string | null;
  status: PropertyStatus;
  notes: string | null;
  created_at: string;
  archived_at: string | null;
}
