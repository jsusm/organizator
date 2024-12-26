<script setup lang="ts">
import type { CreateCategorySchema } from "~/schemas/categories";
import type { CreateOperationSchema } from "~/schemas/operations";

const submitting = ref(false);
const handleSubmit = (values: CreateOperationSchema) => {
  // TODO: handle server error
  submitting.value = true;
  $fetch("/api/operations", {
    method: "post",
    body: values,
  }).then(() => {
    submitting.value = false;
  });
};

const submittingCategory = ref(true);
const handleCategorySubmit = (values: CreateCategorySchema) => {
  // TODO: handle server error
  // TODO: use category composable
  submittingCategory.value = true;
  $fetch("/api/categories", {
    method: "post",
    body: values,
  }).then(() => {
    submittingCategory.value = false;
  });
};
</script>
<template>
  <main class="min-h-screen grid place-items-center">
    <OperationsRegisterOperationForm
      :submitting="submitting"
      :submitting-category="submittingCategory"
      @submit="handleSubmit"
      @submit-category="handleCategorySubmit"
    />
  </main>
</template>
