<script setup lang="ts">
// Supports weights 100-900
import "@fontsource-variable/inter";
import "./assets/css/variables.css";
import { Toaster } from "@/components/ui/sonner";
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster close-button />
  </NuxtLayout>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(-10px);
  /* filter: blur(1rem); */
}
</style>
