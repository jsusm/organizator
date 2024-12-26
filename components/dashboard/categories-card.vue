<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuItem,
} from "../ui/context-menu";

const categories = await useCategories();

const deleteCategoryId = ref<number | null>(null);

function handleDeleteCategory(id: number) {
  deleteCategoryId.value = id;
}
</script>
<template>
  <Card class="border flex-1 rounded-lg">
    <CardHeader class="flex flex-row justify-between items-center">
      <CardTitle>Categories</CardTitle>
      <Button variant="secondary" as-child>
        <NuxtLink to="/create-category"> Create Category </NuxtLink>
      </Button>
    </CardHeader>
    <CardContent class="flex">
      <Icon
        name="tabler:loader-2"
        class="m-auto animate-spin"
        v-if="categories.status.value == 'pending'"
      />
      <div
        class="flex flex-wrap gap-2"
        v-if="categories.status.value == 'success'"
      >
        <ContextMenu v-for="category in categories.data.value">
          <ContextMenuTrigger>
            <DashboardCategory
              :iconName="category.icon"
              :color="category.color"
            />
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              class="text-destructive"
              @click="() => handleDeleteCategory(category.id)"
              >Delete</ContextMenuItem
            >
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </CardContent>
    <!-- Dialog -->
    <Dialog
      :open="deleteCategoryId !== null"
      @update:open="deleteCategoryId = null"
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Delete Category </DialogTitle>
          <DialogDescription>
            Do you realy want to delete this category, all operations related
            with this category will be deleted as well.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="secondary"> Cancel </Button>
          </DialogClose>
          <Button variant="destructive"> Delete </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Card>
</template>
