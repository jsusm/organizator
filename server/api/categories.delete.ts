import * as z from "zod";
import { categories } from "../database/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  // TODO: handle authentication
  const q = getQuery(event);
  console.log(q);
  //
  const query = await getValidatedQuery(
    event,
    z.object({
      id: z.number({ coerce: true }).int(),
    }).parse,
  );

  const db = useDB();

  await db.delete(categories).where(eq(categories.id, query.id));

  return { success: true };
});
