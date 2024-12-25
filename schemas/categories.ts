import * as z from "zod";

export const createCategorySchema = z.object({
  title: z.string().min(3),
  color: z.string(),
  icon: z.string().refine((v) => v, "is required"),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
