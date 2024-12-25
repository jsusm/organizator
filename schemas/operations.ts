import * as z from "zod";

export const createOperationSchema = z.object({
  amount: z.number().gt(0, "The operation can't have 0 amount"),
  date: z.string(),
  description: z.string().optional(),
  categoryId: z.string(),
});

export type CreateOperationSchema = z.infer<typeof createOperationSchema>;
