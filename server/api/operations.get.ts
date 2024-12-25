import { operations } from "../database/schema";
import { useDB } from "../utils/drizzle";

export default defineEventHandler(async (event) => {
  const db = useDB();
  const operationsResults = await db
    .select()
    .from(operations)
    .limit(10)
    .orderBy(operations.date);

  return operationsResults;
});
