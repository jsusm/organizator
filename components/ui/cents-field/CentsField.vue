<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  defaultValue?: string;
  value: string;
  class?: HTMLAttributes["class"];
}>();

const emits = defineEmits<{
  (e: "update:value", payload: string): void;
}>();

const inputValue = ref("");

const onUpdate = (v: string) => {
  console.log({v})
  // replace non numeric characters
  const regex = new RegExp(/[^0-9]/);
  const sanitizedValue = v.toString().replace(regex, "");
  let number = parseInt(sanitizedValue) / 100;
  if (isNaN(number)) {
    number = 0;
  }

  inputValue.value = number.toFixed(2)
  emits("update:value", inputValue.value)
};
</script>

<template>
  <input
    :value="inputValue"
    @input="onUpdate(($event.target as HTMLInputElement).value)"
    :class="
      cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  />
</template>
