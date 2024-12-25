<script setup lang="ts">
import type { CreateCategorySchema } from "~/schemas/categories";

const submitting = ref(false);

const handleSubmit = (values: CreateCategorySchema) => {
  submitting.value = true;
  $fetch("/api/categories", {
    method: "post",
    body: values,
  }).then(() => {
    submitting.value = false;
  });
};
</script>
<template>
  <main class="min-h-screen grid place-items-center">
    <OperationsCreateCategoryForm
      :submitting="submitting"
      @submit="handleSubmit"
    />
  </main>
</template>
