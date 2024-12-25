export async function useCategories() {
  const categories = await useAsyncData('categories', () => $fetch('/api/categories'))
  return categories
}
