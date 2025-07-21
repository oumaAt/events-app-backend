import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

export const registerSchema = z.object({
  firstname: z
    .string()
    .min(2, "Le prénom doit comporter au moins 2 caractères"),
  lastname: z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
  email: z.email("Email invalide"),
  phone: z.string().optional(),
  birthDate: z
    .string()
    .optional()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Date invalide (format attendu : YYYY-MM-DD)"
    ),
  photo: z.string().optional(),
  password: z
    .string()
    .regex(
      passwordRegex,
      "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial."
    ),
});

export const loginSchema = z.object({
  email: z.email("Email invalide"),
  password: z
    .string()
    .regex(
      passwordRegex,
      "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial."
    ),
});
