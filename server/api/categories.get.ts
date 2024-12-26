import { categories } from "../database/schema";

export default defineEventHandler(async (event) => {
  const db = useDB();

  const categoriesResult = db
    .select()
    .from(categories)
    .orderBy(categories.id);

  return categoriesResult;
});
