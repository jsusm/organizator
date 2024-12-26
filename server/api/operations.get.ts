import { desc } from "drizzle-orm";
import { operations } from "../database/schema";
import { useDB } from "../utils/drizzle";

export default defineEventHandler(async (event) => {
  const db = useDB();
  const operationsResults = await db.query.operations.findMany({
    limit: 20,
    orderBy: [desc(operations.date)],
    with: {
      category: true,
    },
  })

  return operationsResults;
});
