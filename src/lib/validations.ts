import * as z from "zod/mini";

/*
 * Built with `zod/mini` (the tree-shakable Zod 4 API): the same schema runs in
 * the browser and in the API route, and the browser only ships the checks it
 * uses instead of the full Zod runtime.
 */

const contactFields = {
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, "Name must be at least 2 characters"),
      z.maxLength(100, "Name must be at most 100 characters"),
    ),
  email: z
    .string()
    .check(
      z.trim(),
      z.email("Enter a valid email address"),
      z.maxLength(254, "Email must be at most 254 characters"),
    ),
  subject: z
    .string()
    .check(
      z.trim(),
      z.minLength(3, "Subject must be at least 3 characters"),
      z.maxLength(150, "Subject must be at most 150 characters"),
    ),
  message: z
    .string()
    .check(
      z.trim(),
      z.minLength(10, "Message must be at least 10 characters"),
      z.maxLength(5000, "Message must be at most 5000 characters"),
    ),
};

/** Client schema — the honeypot must stay empty. */
export const contactFormSchema = z.object({
  ...contactFields,
  website: z.string().check(z.maxLength(0, "Leave this field empty")),
});

/** Server schema — accepts honeypot values so spam can be dropped silently. */
export const contactFormServerSchema = z.object({
  ...contactFields,
  website: z._default(z.optional(z.string().check(z.maxLength(200))), ""),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactField = Exclude<keyof ContactFormValues, "website">;

export function isHoneypotTripped(website: string | undefined) {
  return Boolean(website && website.trim().length > 0);
}

/** Field errors keyed by field name, for the API response. */
export function getFieldErrors(error: z.core.$ZodError) {
  return z.flattenError(error).fieldErrors as Partial<
    Record<ContactField, string[]>
  >;
}
