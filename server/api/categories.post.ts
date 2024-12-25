import { useDB } from "@/server/utils/drizzle";
import { createCategorySchema } from "~/schemas/categories";
import { categories } from "../database/schema";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, createCategorySchema.safeParse);

  if (!body.success) {
    throw createError({
      status: 400,
      data: body.error,
    });
  }

  const db = useDB();

  await db.insert(categories).values(body.data);

  setResponseStatus(event, 201);
  return { success: true };
});
