import { PropertyForm } from "@/components/properties/property-form";
import { createProperty } from "@/lib/properties/actions";
export default function NewPropertyPage() {
  return (
    <>
      <h1 className="text-4xl font-bold">Add a property</h1>
      <p className="mb-7 mt-2 text-slate-600">
        Create the core record for this property.
      </p>
      <PropertyForm action={createProperty} submitLabel="Create property" />
    </>
  );
}
