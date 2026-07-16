import { createClient } from "@/lib/auth/server";

export async function getOrganisationId() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("organisation_members")
    .select("organisation_id")
    .order("created_at")
    .limit(1)
    .maybeSingle();
  if (error) throw new Error("Could not load your organisation.");
  return data?.organisation_id as string | undefined;
}

export async function getDashboardData() {
  const supabase = await createClient();
  const organisationId = await getOrganisationId();
  if (!organisationId)
    return { properties: [], activeProperties: 0, documents: 0, timeline: [] };
  const [properties, propertyCount, documents, timeline] = await Promise.all([
    supabase
      .from("properties")
      .select("*")
      .eq("organisation_id", organisationId)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("properties")
      .select("id", { count: "exact", head: true })
      .eq("organisation_id", organisationId)
      .eq("status", "active"),
    supabase
      .from("documents")
      .select("id", { count: "exact", head: true })
      .eq("organisation_id", organisationId)
      .is("archived_at", null),
    supabase
      .from("timeline_events")
      .select("id,title,event_date,event_type,profiles(full_name)")
      .eq("organisation_id", organisationId)
      .order("event_date", { ascending: false })
      .limit(8),
  ]);
  return {
    properties: properties.data ?? [],
    activeProperties: propertyCount.count ?? 0,
    documents: documents.count ?? 0,
    timeline: timeline.data ?? [],
  };
}
