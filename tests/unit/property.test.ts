import { describe, expect, it } from "vitest";
import { propertySchema } from "@/lib/validation/property";
import { normalisePostcode } from "@/lib/properties/postcode";
import { archiveProperty } from "@/lib/properties/archive";
import { filterProperties } from "@/lib/properties/filter";
import type { PropertyRecord } from "@/lib/database/types";

const valid = {
  displayName: "Rose Cottage",
  addressLine1: "1 High Street",
  addressLine2: "",
  townOrCity: "York",
  county: "",
  postcode: "yo1 7aa",
  ownershipEntityName: "",
  propertyType: "House",
  notes: "",
};
const record: PropertyRecord = {
  id: "1",
  organisation_id: "org",
  display_name: "Rose Cottage",
  address_line_1: "1 High Street",
  address_line_2: null,
  town_or_city: "York",
  county: null,
  postcode: "YO1 7AA",
  ownership_entity_name: null,
  property_type: "House",
  status: "active",
  notes: null,
  created_at: "2026-01-01",
  archived_at: null,
};

describe("property business logic", () => {
  it("validates a complete property and rejects invalid postcodes", () => {
    expect(propertySchema.safeParse(valid).success).toBe(true);
    expect(
      propertySchema.safeParse({ ...valid, postcode: "invalid" }).success,
    ).toBe(false);
  });
  it("normalises UK postcodes", () =>
    expect(normalisePostcode(" sw1a1aa ")).toBe("SW1A 1AA"));
  it("archives without deleting the record and is idempotent", () => {
    const archived = archiveProperty(record, new Date("2026-02-03T10:00:00Z"));
    expect(archived.status).toBe("archived");
    expect(archived.archived_at).toBe("2026-02-03T10:00:00.000Z");
    expect(archiveProperty(archived)).toBe(archived);
  });
  it("searches address fields and filters by status", () => {
    expect(filterProperties([record], "yo1", "active")).toHaveLength(1);
    expect(filterProperties([record], "rose", "archived")).toHaveLength(0);
  });
});
