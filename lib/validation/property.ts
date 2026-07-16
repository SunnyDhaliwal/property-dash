import { z } from "zod";

const optional = z.string().trim().max(500).optional().or(z.literal(""));
export const propertySchema = z.object({
  displayName: z.string().trim().min(1, "Enter a property name").max(120),
  addressLine1: z
    .string()
    .trim()
    .min(1, "Enter the first line of the address")
    .max(160),
  addressLine2: optional,
  townOrCity: z.string().trim().min(1, "Enter a town or city").max(100),
  county: optional,
  postcode: z
    .string()
    .trim()
    .min(1, "Enter a postcode")
    .refine(
      (value) => /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(value),
      "Enter a valid UK postcode",
    ),
  ownershipEntityName: optional,
  propertyType: optional,
  notes: z
    .string()
    .trim()
    .max(5000, "Notes must be 5,000 characters or fewer")
    .optional()
    .or(z.literal("")),
});
export type PropertyInput = z.infer<typeof propertySchema>;
