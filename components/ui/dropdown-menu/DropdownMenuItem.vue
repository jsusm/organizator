<script setup lang="ts">
import { cn } from "@/lib/utils";
import {
    type DropdownMenuCheckboxItemProps,
  DropdownMenuItem,
  type DropdownMenuItemProps,
  useForwardProps,
} from "radix-vue";
import { computed, type HTMLAttributes } from "vue";
import { dropdownMenuItemVariant, type DropdownMenuItemVariant } from ".";

const props = defineProps<
  DropdownMenuItemProps & { class?: HTMLAttributes["class"]; inset?: boolean, variant?: DropdownMenuItemVariant['variant'] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    :class="
      cn(
        dropdownMenuItemVariant({variant: props.variant}),
        inset && 'pl-8',
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuItem>
</template>
