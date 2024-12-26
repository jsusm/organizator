<script setup lang="ts">
import type { CreateCategorySchema } from "~/schemas/categories";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuItem,
} from "../ui/context-menu";
import Dialog from "../ui/dialog/Dialog.vue";

const { categories, deleteCategory, createCategory } = await useCategories();

// delete category
const deleteCategoryId = ref<number | null>(null);

function handleDeleteCategory(id: number) {
  deleteCategoryId.value = id;
}

const deletingCategory = ref(false);

function confirmDelete() {
  if (deleteCategoryId.value === null) return;

  deletingCategory.value = true;

  deleteCategory(deleteCategoryId.value)
    .finally(() => {
      deleteCategoryId.value = null;
      deletingCategory.value = false;
    })
    .catch(() => {
      // TODO: notify error
    });
}

// create category
const creatingCategory = ref(false);
const createCategoryFormOpen = ref(false);

function handleCreateCategory(values: CreateCategorySchema) {
  creatingCategory.value = true
  createCategory(values)
    .finally(() => {
      createCategoryFormOpen.value=false;
      creatingCategory.value = false;
    })
}
</script>
<template>
  <Card class="border flex-1 rounded-lg">
    <CardHeader class="flex flex-row justify-between items-center">
      <CardTitle>Categories</CardTitle>
      <Button
        type="button"
        variant="secondary"
        @click="createCategoryFormOpen = true"
      >
        Create Category
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
          <Button
            variant="destructive"
            @click="confirmDelete"
            :disabled="deletingCategory"
          >
            <Icon
              name="tabler:loader-2"
              v-if="deletingCategory"
              class="w-4 h-4 animate-spin mr-1"
            />

            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog
      :open="createCategoryFormOpen"
      @update:open="(v) => (createCategoryFormOpen = v)"
    >
      <DialogTrigger> </DialogTrigger>
      <DialogContent class="w-96">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription
            >Categorize your operations findthem easily</DialogDescription
          >
        </DialogHeader>
        <OperationsCreateCategoryForm @submit="handleCreateCategory" :submitting="creatingCategory" />
      </DialogContent>
    </Dialog>
  </Card>
</template>
