import { createClient } from "@/lib/auth/server";
import { getOrganisationId } from "@/lib/database/queries";
export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ property?: string; category?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const organisationId = await getOrganisationId();
  if (!organisationId) return <Empty />;
  const [{ data: properties }, { data: categories }] = await Promise.all([
    supabase
      .from("properties")
      .select("id,display_name")
      .eq("organisation_id", organisationId)
      .neq("status", "archived"),
    supabase
      .from("document_categories")
      .select("id,name")
      .eq("organisation_id", organisationId)
      .order("sort_order"),
  ]);
  let query = supabase
    .from("documents")
    .select(
      "id,title,document_date,original_filename,properties(display_name),document_categories(name)",
    )
    .eq("organisation_id", organisationId)
    .is("archived_at", null)
    .order("document_date", { ascending: false });
  if (params.property) query = query.eq("property_id", params.property);
  if (params.category) query = query.eq("category_id", params.category);
  const { data: documents } = await query;
  return (
    <>
      <h1 className="text-4xl font-bold">Documents</h1>
      <p className="mt-2 text-slate-600">
        Document metadata across your properties.
      </p>
      <div className="card mt-6 border-emerald-200 bg-emerald-50">
        <strong>
          File upload and Google Drive filing are coming in the next milestone.
        </strong>
        <p className="mt-1">
          This page currently displays metadata records only.
        </p>
      </div>
      <form className="card mt-6 flex flex-wrap gap-4">
        <div className="field">
          <label htmlFor="property">Property</label>
          <select
            id="property"
            name="property"
            defaultValue={params.property ?? ""}
          >
            <option value="">All properties</option>
            {properties?.map((p) => (
              <option value={p.id} key={p.id}>
                {p.display_name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            defaultValue={params.category ?? ""}
          >
            <option value="">All categories</option>
            {categories?.map((c) => (
              <option value={c.id} key={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button className="button button-secondary self-end">Filter</button>
      </form>
      {documents?.length ? (
        <ul className="mt-6 grid gap-3">
          {documents.map((doc) => (
            <li className="card" key={doc.id}>
              <h2 className="font-bold">{doc.title}</h2>
              <p className="text-sm text-slate-600">{doc.original_filename}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="card mt-6 text-center">
          <h2 className="text-xl font-bold">No document records</h2>
          <p className="mt-2 text-slate-600">
            Metadata will appear here once document handling is introduced.
          </p>
        </div>
      )}
    </>
  );
}
function Empty() {
  return (
    <>
      <h1 className="text-4xl font-bold">Documents</h1>
      <div className="card mt-6">
        <p>Add a property before document metadata can be recorded.</p>
      </div>
    </>
  );
}
