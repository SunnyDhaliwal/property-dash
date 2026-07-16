import Link from "next/link";
import { getDashboardData } from "@/lib/database/queries";
import { TimelineList } from "@/components/timeline/timeline-list";

export default async function DashboardPage() {
  const data = await getDashboardData();
  const firstUse = data.activeProperties === 0 && data.documents === 0;
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-emerald-800">Overview</p>
          <h1 className="text-4xl font-bold">Dashboard</h1>
        </div>
        <Link className="button button-primary" href="/properties/new">
          {firstUse ? "Add your first property" : "Add property"}
        </Link>
      </div>
      {firstUse && (
        <section className="card mt-8 bg-emerald-50">
          <h2 className="text-2xl font-bold">Start your property memory</h2>
          <p className="mt-2 max-w-xl">
            Add your first property to begin building its reliable,
            chronological record.
          </p>
        </section>
      )}
      <section
        aria-label="Portfolio summary"
        className="mt-8 grid gap-4 sm:grid-cols-2"
      >
        <div className="card">
          <p className="text-slate-600">Active properties</p>
          <p className="mt-2 text-4xl font-bold">{data.activeProperties}</p>
        </div>
        <div className="card">
          <p className="text-slate-600">Document records</p>
          <p className="mt-2 text-4xl font-bold">{data.documents}</p>
        </div>
      </section>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section className="card">
          <h2 className="mb-5 text-xl font-bold">Recently added properties</h2>
          {data.properties.length ? (
            <ul className="grid gap-3">
              {data.properties.map((property) => (
                <li key={property.id}>
                  <Link
                    className="font-semibold underline"
                    href={`/properties/${property.id}`}
                  >
                    {property.display_name}
                  </Link>
                  <p className="text-sm text-slate-600">{property.postcode}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No properties yet.</p>
          )}
        </section>
        <section className="card">
          <h2 className="mb-5 text-xl font-bold">Recent activity</h2>
          <TimelineList events={data.timeline} />
        </section>
      </div>
    </>
  );
}
