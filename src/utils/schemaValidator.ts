import { z } from "zod";

const requestSchema = z.object({
  query: z.string().min(5, "The query must have at least 5 characters."),
  schema: z
    .record(z.string(), z.array(z.string()))
    .optional(),
});

export function validateRequest(data: any) {
  return requestSchema.safeParse(data);
}