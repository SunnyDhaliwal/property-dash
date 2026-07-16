import type { PropertyRecord, PropertyStatus } from "@/lib/database/types";

export function filterProperties(
  items: PropertyRecord[],
  search: string,
  status?: PropertyStatus,
) {
  const needle = search.trim().toLowerCase();
  return items.filter((item) => {
    const matchesStatus = !status || item.status === status;
    const haystack = [
      item.display_name,
      item.address_line_1,
      item.town_or_city,
      item.postcode,
    ]
      .join(" ")
      .toLowerCase();
    return matchesStatus && (!needle || haystack.includes(needle));
  });
}
