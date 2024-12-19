<script setup lang="ts">
defineProps<{ currency?: boolean, amount: Number }>()
</script>
<template>
  <div class="flex gap-4 flex-col pl-4 pr-6 py-5 rounded-xl border border-stone-800">
    <div class="flex justify-between items-center">
      <slot />
    </div>
    <div class="flex items-center text-stone-300">
      <Icon name="tabler:currency-dollar" v-if="currency" class="w-8 h-8" />
      <p class="font-mono text-3xl font-medium ">{{ amount }}</p>
    </div>
  </div>
</template>
