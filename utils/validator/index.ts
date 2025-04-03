import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must be digits only"),
  email: z.string().email("Please provide a valid email address"),
  message: z.string().min(1, "Message is required"),
});
