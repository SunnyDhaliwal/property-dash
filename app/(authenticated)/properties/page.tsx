import Link from "next/link";
import { createClient } from "@/lib/auth/server";
import { getOrganisationId } from "@/lib/database/queries";
import { filterProperties } from "@/lib/properties/filter";
import type { PropertyRecord, PropertyStatus } from "@/lib/database/types";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; archived?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const organisationId = await getOrganisationId();
  const { data } = organisationId
    ? await supabase
        .from("properties")
        .select("*")
        .eq("organisation_id", organisationId)
        .order("display_name")
    : { data: [] };
  const status =
    params.archived === "true"
      ? "archived"
      : ["active", "inactive"].includes(params.status ?? "")
        ? (params.status as PropertyStatus)
        : "active";
  const properties = filterProperties(
    (data ?? []) as PropertyRecord[],
    params.q ?? "",
    status,
  );
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Properties</h1>
          <p className="mt-2 text-slate-600">
            Your organisation’s property records.
          </p>
        </div>
        <Link className="button button-primary" href="/properties/new">
          Add property
        </Link>
      </div>
      <form className="card mt-8 flex flex-wrap items-end gap-4">
        <div className="field min-w-64 flex-1">
          <label htmlFor="q">Search</label>
          <input
            id="q"
            name="q"
            defaultValue={params.q}
            placeholder="Name, address or postcode"
          />
        </div>
        <div className="field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={status}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <button className="button button-secondary">Apply filters</button>
      </form>
      <section className="mt-6">
        {properties.length ? (
          <ul className="grid gap-4 md:grid-cols-2">
            {properties.map((property) => (
              <li className="card" key={property.id}>
                <div className="flex justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold">
                      <Link href={`/properties/${property.id}`}>
                        {property.display_name}
                      </Link>
                    </h2>
                    <p className="mt-2 text-slate-600">
                      {property.address_line_1}, {property.town_or_city},{" "}
                      {property.postcode}
                    </p>
                  </div>
                  <span className="capitalize">{property.status}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="card text-center">
            <h2 className="text-xl font-bold">No matching properties</h2>
            <p className="mt-2 text-slate-600">
              Adjust your filters or add a property to get started.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
