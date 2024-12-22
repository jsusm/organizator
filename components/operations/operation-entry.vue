<script setup lang="ts">
import type { Operation } from "~/types";
import { format } from "date-fns";

defineProps<{ operation: Operation }>();
</script>
<template>
  <div
    class="flex items-center border border-stone-800 px-4 py-2 rounded-lg gap-4"
  >
    <DashboardCategory iconName="carrot" color="violet" />
    <div class="flex-1 flex justify-between align-center">
      <div>
        <p class="text-stone-300">{{ operation.tag }}</p>
        <p class="text-sm text-stone-500">{{ operation.description }}</p>
      </div>
      <div class="">
        <p class="text-red-400 font-medium text-right">
          {{ operation.amount.toFixed(2) }}
        </p>
        <p class="text-sm text-stone-500 text-right">
          {{ format(operation.date, "MMM d") }}
        </p>
      </div>
    </div>
  </div>
</template>
