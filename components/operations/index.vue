<script setup lang="ts">
import { format } from "date-fns";
import type { Operation } from "~/types";
import OperationEntry from "./operation-entry.vue";
const props = defineProps<{ operations: Operation[] }>();

function groupByDay(oprs: Operation[]) {
  const gruped: Record<string, Operation[]> = {};
  for (const i of oprs) {
    const key = format(i.date, "MMM d");
    if (!gruped[key]) {
      gruped[key] = [];
    }
    gruped[key].push(i);
  }
  return gruped;
}

const oprts = groupByDay(props.operations);
</script>
<template>
  <Card>
    <CardHeader class="flex flex-row justify-between items-center">
      <CardTitle>Operations</CardTitle>
      <div>
        <Button as-child variant="secondary">
          <NuxtLink to="/register-operation">Register Operation</NuxtLink>
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div v-for="(operations, day) in oprts">
        <p class="text-sm text-center text-stone-600">{{ day }}</p>
        <ul class="space-y-2 py-2 pb-4">
          <li v-for="operation in operations">
            <OperationEntry :operation="operation" />
          </li>
        </ul>
      </div>
    </CardContent>
  </Card>
</template>
