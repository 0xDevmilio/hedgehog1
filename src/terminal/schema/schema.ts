import { z } from "zod";

export const accessResponse = z.object({
  allowed: z.boolean(),
});

export type AccessResponse = z.infer<typeof accessResponse>;

export const registerResponse = z.object({
  response: z.boolean(),
});

export type RegisterResponse = z.infer<typeof registerResponse>;
