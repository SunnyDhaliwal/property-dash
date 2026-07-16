import type { OrganisationRole } from "@/lib/database/types";

export const permissions = {
  canManageOrganisation: (role: OrganisationRole) =>
    role === "owner" || role === "admin",
  canWriteProperties: (role: OrganisationRole) => role !== "viewer",
  canChangeRoles: (role: OrganisationRole) => role === "owner",
};
