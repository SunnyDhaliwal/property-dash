import { describe, expect, it } from "vitest";
import { permissions } from "@/lib/auth/permissions";
import {
  DEFAULT_DOCUMENT_CATEGORIES,
  defaultCategoryRows,
} from "@/lib/documents/categories";
import { createTimelineEvent } from "@/lib/timeline/events";

describe("organisation foundations", () => {
  it("enforces role permissions", () => {
    expect(permissions.canManageOrganisation("admin")).toBe(true);
    expect(permissions.canWriteProperties("member")).toBe(true);
    expect(permissions.canWriteProperties("viewer")).toBe(false);
  });
  it("creates the six ordered default categories with stable conflict keys", () => {
    const rows = defaultCategoryRows("org");
    expect(rows.map((r) => r.name)).toEqual([...DEFAULT_DOCUMENT_CATEGORIES]);
    expect(
      new Set(rows.map((r) => `${r.organisation_id}:${r.slug}`)).size,
    ).toBe(6);
  });
  it("builds a typed timeline event", () =>
    expect(
      createTimelineEvent(
        "property_created",
        "p1",
        "Property created",
        new Date("2026-01-01Z"),
      ),
    ).toMatchObject({
      event_type: "property_created",
      property_id: "p1",
      title: "Property created",
    }));
});
