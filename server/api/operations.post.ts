import { createOperationSchema } from "~/schemas/operations";
import { operations } from "../database/schema";
import { useDB } from "../utils/drizzle";
import { LibsqlError } from "@libsql/client";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, createOperationSchema.safeParse);
  const db = useDB();

  if (!body.success) {
    throw createError({
      status: 400,
      data: body.error,
    });
  }

  let categoryId: number | undefined = body.data.categoryId
  if(categoryId < 0) {
    categoryId = undefined
  }

  try {
    await db.insert(operations).values({
      ...body.data,
      date: new Date(body.data.date),
      categoryId: categoryId,
    });
    setResponseStatus(event, 201);
    return { success: true };
  } catch (error) {
    if (error instanceof LibsqlError) {
      if (error.code === "SQLITE_CONSTRAINT_FOREIGNKEY") {
        setResponseStatus(event, 400);
        return { success: false, error: "Unknow category id" };
      }
    }
    setResponseStatus(event, 500);
    return { success: false, error: "Unhandled error" };
  }
});
