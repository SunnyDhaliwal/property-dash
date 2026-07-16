"use client";
import { useActionState } from "react";
import type { PropertyActionState } from "@/lib/properties/actions";

type Values = Partial<
  Record<
    | "displayName"
    | "addressLine1"
    | "addressLine2"
    | "townOrCity"
    | "county"
    | "postcode"
    | "ownershipEntityName"
    | "propertyType"
    | "notes",
    string | null
  >
>;
export function PropertyForm({
  action,
  values = {},
  submitLabel,
}: {
  action: (
    state: PropertyActionState,
    data: FormData,
  ) => Promise<PropertyActionState>;
  values?: Values;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const fields: { name: keyof Values; label: string; required?: boolean }[] = [
    { name: "displayName", label: "Display name", required: true },
    { name: "addressLine1", label: "Address line 1", required: true },
    { name: "addressLine2", label: "Address line 2" },
    { name: "townOrCity", label: "Town or city", required: true },
    { name: "county", label: "County" },
    { name: "postcode", label: "Postcode", required: true },
    { name: "ownershipEntityName", label: "Ownership entity name" },
    { name: "propertyType", label: "Property type" },
  ];
  return (
    <form action={formAction} className="card grid gap-5" aria-busy={pending}>
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((field) => (
          <div className="field" key={field.name}>
            <label htmlFor={field.name}>
              {field.label}
              {field.required && " *"}
            </label>
            <input
              id={field.name}
              name={field.name}
              defaultValue={values[field.name] ?? ""}
              required={field.required}
              aria-invalid={Boolean(state.errors?.[field.name])}
              aria-describedby={`${field.name}-error`}
            />
            {state.errors?.[field.name] && (
              <p className="error" id={`${field.name}-error`}>
                {state.errors[field.name][0]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="field">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          rows={5}
          defaultValue={values.notes ?? ""}
        />
        {state.errors?.notes && (
          <p className="error">{state.errors.notes[0]}</p>
        )}
      </div>
      {state.message && (
        <p className="error" role="alert">
          {state.message}
        </p>
      )}
      <button
        className="button button-primary justify-self-start"
        disabled={pending}
      >
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
