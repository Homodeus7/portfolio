import * as z from "zod";

const passwordRequirements = z
  .string()
  .min(8, "Минимум 8 символов")
  .regex(/[a-z]/, "Минимум одна строчная буква")
  .regex(/[A-Z]/, "Минимум одна заглавная буква")
  .regex(/[0-9]/, "Минимум одна цифра")
  .regex(/[^A-Za-z0-9]/, "Минимум один специальный символ");

export const authSchema = z.object({
  email: z.string().email("Невалидный email"),
  password: passwordRequirements,
});

export type AuthSchema = z.output<typeof authSchema>;
