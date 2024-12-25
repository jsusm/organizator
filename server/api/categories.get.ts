import { categories } from "../database/schema";

export default defineEventHandler(async (event) => {
  const db = useDB();

  const categoriesResult = db
    .select()
    .from(categories)
    .limit(10)
    .orderBy(categories.id);

  return categoriesResult;
});
