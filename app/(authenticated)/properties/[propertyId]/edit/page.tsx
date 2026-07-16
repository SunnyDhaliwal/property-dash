import { notFound } from "next/navigation";
import { createClient } from "@/lib/auth/server";
import { PropertyForm } from "@/components/properties/property-form";
import { updateProperty } from "@/lib/properties/actions";
export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const { propertyId } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("properties")
    .select("*")
    .eq("id", propertyId)
    .maybeSingle();
  if (!data) notFound();
  const action = updateProperty.bind(null, propertyId);
  return (
    <>
      <h1 className="text-4xl font-bold">Edit property</h1>
      <p className="mb-7 mt-2 text-slate-600">
        Update the property record. Meaningful changes are added to its
        timeline.
      </p>
      <PropertyForm
        action={action}
        submitLabel="Save changes"
        values={{
          displayName: data.display_name,
          addressLine1: data.address_line_1,
          addressLine2: data.address_line_2,
          townOrCity: data.town_or_city,
          county: data.county,
          postcode: data.postcode,
          ownershipEntityName: data.ownership_entity_name,
          propertyType: data.property_type,
          notes: data.notes,
        }}
      />
    </>
  );
}
