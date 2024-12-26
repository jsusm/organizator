import type { CreateCategorySchema } from "~/schemas/categories";

export async function useCategories() {
  const categories = await useAsyncData("categories", () =>
    $fetch("/api/categories"),
  );

  const deleteCategory = async (id: number) => {
    await $fetch("/api/categories", {
      method: "delete",
      query: {
        id,
      },
    });
    categories.refresh();
  };

  const createCategory = async (values: CreateCategorySchema) => {
    await $fetch("/api/categories", {
      method: "post",
      body: values,
    });
    categories.refresh();
  };

  return { categories, deleteCategory, createCategory };
}
