import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/auth/server";
import { TimelineList } from "@/components/timeline/timeline-list";
import { ArchiveForm } from "@/components/properties/archive-form";
import { archivePropertyAction } from "@/lib/properties/actions";
import { DEFAULT_DOCUMENT_CATEGORIES } from "@/lib/documents/categories";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const { propertyId } = await params;
  const supabase = await createClient();
  const [record, documents, events] = await Promise.all([
    supabase.from("properties").select("*").eq("id", propertyId).maybeSingle(),
    supabase
      .from("documents")
      .select("id", { count: "exact", head: true })
      .eq("property_id", propertyId)
      .is("archived_at", null),
    supabase
      .from("timeline_events")
      .select("id,title,description,event_date,profiles(full_name)")
      .eq("property_id", propertyId)
      .order("event_date", { ascending: false })
      .limit(20),
  ]);
  if (!record.data) notFound();
  const property = record.data;
  const archive = archivePropertyAction.bind(null, propertyId);
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="capitalize text-emerald-800">{property.status}</p>
          <h1 className="text-4xl font-bold">{property.display_name}</h1>
          <p className="mt-2 text-slate-600">
            {[
              property.address_line_1,
              property.address_line_2,
              property.town_or_city,
              property.county,
              property.postcode,
            ]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            className="button button-secondary"
            href={`/properties/${propertyId}/edit`}
          >
            Edit property
          </Link>
          {property.status !== "archived" && <ArchiveForm action={archive} />}
        </div>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
        <aside className="grid content-start gap-5">
          <section className="card">
            <h2 className="font-bold">Property details</h2>
            <dl className="mt-4 grid gap-3">
              <div>
                <dt className="text-sm text-slate-600">Ownership entity</dt>
                <dd>{property.ownership_entity_name || "Not recorded"}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-600">Documents</dt>
                <dd>{documents.count ?? 0}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-600">Notes</dt>
                <dd className="whitespace-pre-wrap">
                  {property.notes || "No notes"}
                </dd>
              </div>
            </dl>
          </section>
          <section className="card">
            <h2 className="font-bold">Future actions</h2>
            <button className="button button-secondary mt-3 w-full" disabled>
              Upload document — coming later
            </button>
            <button className="button button-secondary mt-3 w-full" disabled>
              Open Google Drive — coming later
            </button>
          </section>
        </aside>
        <section className="card">
          <h2 className="mb-5 text-xl font-bold">Timeline</h2>
          <TimelineList events={events.data ?? []} />
        </section>
      </div>
      <section className="mt-8">
        <h2 className="text-2xl font-bold">Document categories</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DEFAULT_DOCUMENT_CATEGORIES.map((category) => (
            <div className="card" key={category}>
              <h3 className="font-semibold">{category}</h3>
              <p className="mt-1 text-sm text-slate-600">
                No documents recorded.
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
