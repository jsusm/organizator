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

  return { categories, deleteCategory };
}
