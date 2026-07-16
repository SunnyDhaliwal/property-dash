"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/auth/server";
import { propertySchema } from "@/lib/validation/property";
import { normalisePostcode } from "@/lib/properties/postcode";

export type PropertyActionState = {
  errors?: Record<string, string[]>;
  message?: string;
};

function input(formData: FormData) {
  return {
    displayName: formData.get("displayName"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2"),
    townOrCity: formData.get("townOrCity"),
    county: formData.get("county"),
    postcode: formData.get("postcode"),
    ownershipEntityName: formData.get("ownershipEntityName"),
    propertyType: formData.get("propertyType"),
    notes: formData.get("notes"),
  };
}

export async function createProperty(
  _: PropertyActionState,
  formData: FormData,
): Promise<PropertyActionState> {
  const parsed = propertySchema.safeParse(input(formData));
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors };
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("create_property_with_event", {
    input: {
      ...parsed.data,
      postcode: normalisePostcode(parsed.data.postcode),
    },
  });
  if (error) return { message: error.message };
  redirect(`/properties/${data as string}`);
}

export async function updateProperty(
  propertyId: string,
  _: PropertyActionState,
  formData: FormData,
): Promise<PropertyActionState> {
  const parsed = propertySchema.safeParse(input(formData));
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors };
  const supabase = await createClient();
  const { error } = await supabase.rpc("update_property_with_event", {
    target_property_id: propertyId,
    input: {
      ...parsed.data,
      postcode: normalisePostcode(parsed.data.postcode),
    },
  });
  if (error) return { message: error.message };
  revalidatePath(`/properties/${propertyId}`);
  redirect(`/properties/${propertyId}`);
}

export async function archivePropertyAction(propertyId: string) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("archive_property_with_event", {
    target_property_id: propertyId,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/properties");
  redirect("/properties?archived=true");
}
