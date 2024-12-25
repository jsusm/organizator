<script setup lang="ts">
const submitting = ref(false);
const submittingCategory = ref(true);
</script>
<template>
  <main class="min-h-screen grid place-items-center">
    <OperationsRegisterOperationForm
      :submitting="submitting"
      :submitting-category="submittingCategory"
    />
  </main>
</template>
