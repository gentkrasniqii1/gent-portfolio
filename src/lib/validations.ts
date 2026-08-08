import { z } from "zod";

const contactFields = {
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Enter a valid email address").max(254),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(150),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
};

/** Client schema — honeypot must stay empty */
export const contactFormSchema = z.object({
  ...contactFields,
  website: z.string().max(0, "Leave this field empty"),
});

/** Server schema — allow honeypot values so we can silently drop spam */
export const contactFormServerSchema = z.object({
  ...contactFields,
  website: z.string().max(200).optional().default(""),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function isHoneypotTripped(website: string | undefined) {
  return Boolean(website && website.trim().length > 0);
}
