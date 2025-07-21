import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3, "Le titre doit comporter au moins 3 caractères"),
  description: z.string().optional(),
  date: z
    .string()
    .optional()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Date invalide (format attendu : YYYY-MM-DD)"
    ),
  location: z.string().min(2, "Le lieu doit comporter au moins 2 caractères"),
  category: z.enum(["conference", "workshop", "concert"]).optional(),
  nbParticipants: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Le nombre de participants doit être un nombre valide",
    }),
  isPublic: z.boolean().optional(),
  status: z.enum(["scheduled", "ongoing", "cancelled", "done"]).optional(),
});
