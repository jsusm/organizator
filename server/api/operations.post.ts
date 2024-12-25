import { createOperationSchema } from "~/schemas/operations";
import { operations } from "../database/schema";
import { useDB } from "../utils/drizzle";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, createOperationSchema.safeParse);
  const db = useDB();

  if (!body.success) {
    throw createError({
      status: 400,
      data: body.error,
    });
  }

  await db.insert(operations).values({
    ...body.data,
    date: new Date(body.data.date),
    categoryId: parseInt(body.data.categoryId),
  });
  setResponseStatus(event, 201);
  return { success: true };
});
