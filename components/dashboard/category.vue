<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Primitive, type PrimitiveProps } from "radix-vue";
import type { HTMLAttributes } from "vue";

interface Props extends PrimitiveProps {
  color?: string;
  iconName: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "span",
});
</script>

<template>
  <Primitive
    :as-child="asChild"
    :class="
      cn(
        {
          [`bg-${props.color}-950 border-${props.color}-600 text-${props.color}-500`]:
            color,
          [`bg-stone-950 border-stone-600 text-stone-500`]: !color,
        },
        props.class,
      )
    "
    class="border h-10 w-10 flex rounded-lg transition-colors"
    :as="as"
  >
    <Icon :name="`tabler:${iconName}`" v-if="iconName" class="w-5 h-5 m-auto" />
  </Primitive>
</template>
